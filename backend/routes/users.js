const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bodyParser = require('body-parser');
//const moment = require("moment");
const nodemailer = require('nodemailer');

const router = express.Router();

const User = require("../models/user");
const Last = require("../models/last");
const Follow =  require("../models/follow");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });

  router.post("/register1", multer({ storage: storage }).single("slika"), (req, res, next) => {
    let slikaPut = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
    bcrypt.hash(req.body.lozinka, 10).then(hash => {
      let user = new User({
        ime: req.body.ime,
        prezime: req.body.prezime,
        slikaPutanja: slikaPut,
        korime: req.body.korime,
        lozinka: hash,
        datum: new Date(req.body.datum),//moment(new Date(req.body.datum)).format("YYYY-MM-DD"),// moment(new Date(req.body.datum)).add(2, 'hours'), //moment(req.body.datum).format("YYYY-MM-DD"),// moment(new Date(req.body.datum)), 
        grad: req.body.grad,
        drzava: req.body.drzava,
        email: req.body.email,
        privilegije: false,
        zahtev: true,
        prihvacen: false
      });
      user.save().then(createdUser => {
        res.status(200).json(createdUser);
      }).catch(err => {
        res.status(400).json("Desila se greska prilikom registrovanja");
      });
    });
    }
  );

  router.post("/register2",  (req, res, next) => {
    bcrypt.hash(req.body.lozinka, 10).then(hash => {
      let user = new User({
        ime: req.body.ime,
        prezime: req.body.prezime,
        slikaPutanja: req.body.slikaPutanja,
        korime: req.body.korime,
        lozinka: hash,
        datum: new Date(req.body.datum),//moment(new Date(req.body.datum)).format("YYYY-MM-DD"), //moment(new Date(req.body.datum)).add(2, 'hours'), // moment(req.body.datum),//.format("YYYY-MM-DD"),
        grad: req.body.grad,
        drzava: req.body.drzava,
        email: req.body.email,
        privilegije: false,
        zahtev: true,
        prihvacen: false
      });
      user.save().then(createdUser => {
        res.status(200).json(createdUser);
      }).catch(err => {
        res.status(400).json("Desila se greska prilikom registrovanja");
      });
    });
    }
  );

  router.post("/izmena1",multer({ storage: storage }).single("slika"), (req, res, next) => {
    let slikaPut = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
    let korime = req.body.korime;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let slikaPutanja = slikaPut;
    let  datum = new Date(req.body.datum);//moment(new Date(req.body.datum)).format("YYYY-MM-DD");
    let grad = req.body.grad;
    let drzava = req.body.drzava;
    let email = req.body.email;
    User.updateOne({korime: korime}, {"$set": {
      "ime": ime,
      "prezime": prezime,
      "slikaPutanja": slikaPutanja,
      "datum": datum,
      "grad": grad,
      "drzava": drzava,
      "email": email
      }}, (err) => {
      if(err) {
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Uspesno azurirano");  
      }
    });
  });

  router.post("/izmena2", (req, res, next) => {
    let korime = req.body.korime;
    let ime = req.body.ime;
    let prezime = req.body.prezime;
    let slikaPutanja = req.body.slikaPutanja;
    let  datum = new Date(req.body.datum);//moment(new Date(req.body.datum)).format("YYYY-MM-DD");
    let grad = req.body.grad;
    let drzava = req.body.drzava;
    let email = req.body.email;
    User.updateOne({korime: korime}, {"$set": {
      "ime": ime,
      "prezime": prezime,
      "slikaPutanja": slikaPutanja,
      "datum": datum,
      "grad": grad,
      "drzava": drzava,
      "email": email
      }}, (err) => {
      if(err) {
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Uspesno azurirano");  
      }
    });
  });

  router.route("/login").post((req, res, next) => {
    let pom_user;
    User.findOne({korime: req.body.korime}).then(user => { 
        if(!user) {
            return res.status(200).json({
              token: null,
              expiresIn: null,
              userId: null,
              message: "Pogresno korisnicko ime!"
          });
        }           
        pom_user = user;
        
        if(user.prihvacen == false) {
          return res.status(200).json({
            token: null,
            expiresIn: null,
            userId: null,
            message: "Korisnik nije prihvacen!"
        });
        }
        //return bcrypt.compare(req.body.password, user.password); 
        
         bcrypt.compare(req.body.lozinka, user.lozinka, (err, result) => {
             if(err) {
                return res.status(400).json({error: err});
             }
             else {
                if(!result) {  
                    return res.status(200).json({
                      token: null,
                      expiresIn: null,
                      userId: null,
                      message: "Pogresna lozinka!"
                  });
                }

                const token = jwt.sign(
                    {korime: pom_user.korime, userId: pom_user._id},
                    "tajni_string_koji_sluzi_za_pravljenje_tokena",
                    {expiresIn: "1h"}
                );
                res.status(200).json({
                    token: token,
                    expiresIn: 3600,
                    userId: pom_user._id,
                    message: "Uspesna prijava!"
                   // korime: pom_user.korime
                });
             }    
         });
      }).catch(err => {
        console.log(err);
      })     
  });

  router.get("/get_unregistered", (req, res, next) => {
    User.find({zahtev: true}, {
      _id: 0,
      ime: 1,
      prezime: 1,
      slikaPutanja: 1,
      korime: 1,
      lozinka: 1,
      datum: 1,
      grad: 1,
      drzava: 1,
      email: 1,
      privilegije: 1,
    }, (err, data) => {
      if(err) {
        res.status(400).json("Desila se greska");
      }
      else {
        res.status(200).json(data);
      }
    });
  });

  router.get("/get_registered", (req, res, next) => {
    User.find({prihvacen: true}, {
      _id: 0,
      ime: 1,
      prezime: 1,
      slikaPutanja: 1,
      korime: 1,
      lozinka: 1,
      datum: 1,
      grad: 1,
      drzava: 1,
      email: 1,
      privilegije: 1,
    }, (err, data) => {
      if(err) {
        res.status(400).json("Desila se greska");
      }
      else {
        res.status(200).json(data);
      }
    });
  });
  

  router.post("/potvrdi", (req, res, next) => {
    let korime = req.body.korime;
    User.updateOne({korime: korime}, {"$set": {"zahtev": false, "prihvacen":true}}, (err) => {
      if(err) {
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Korisnik je prihvacen");  
      }
    });
  });

  router.post("/odbaci", (req, res, next) => {
    let korime = req.body.korime;
    User.updateOne({korime: korime}, {"$set": {"zahtev": false, "prihvacen":false}}, (err) => {
      if(err) {
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Korisnik je odbacen");  
      }
    });
  });

  router.post("/dodeli", (req, res, next) => {
    let korime = req.body.korime;
    User.updateOne({korime: korime}, {"$set": {"privilegije": true}}, (err) => {
      if(err) {
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Dodeljene privilegije");  
      }
    });
  });

  router.post("/oduzmi", (req, res, next) => {
    let korime = req.body.korime;
    User.updateOne({korime: korime}, {"$set": {"privilegije": false}}, (err) => {
      if(err) {
        res.status(400).json(err);
      }
      else{
        res.status(200).json("Oduzete privilegije");  
      }
    });
  });

  router.post("/promeni", (req, res, next) => {
    let korime = req.body.korime;
    let stara_lozinka = req.body.stara_lozinka;
    let nova_lozinka = req.body.nova_lozinka;

    User.findOne({korime: req.body.korime}).then(user => {
      bcrypt.compare(stara_lozinka, user.lozinka, (err, result) => {
        if(err) {
          return res.status(400).json({error: err});
        } else {
          if(!result) {
            return res.status(200).json({
              flag: false,
              message: "Stara lozinka nije dobra!"
            });
          }
          bcrypt.hash(nova_lozinka, 10).then(hash => {
            User.updateOne({korime: korime}, {"$set": {"lozinka": hash}}, (err) => {
              if(err) {
                res.status(400).json(err);
              }
              else{
                res.status(200).json({
                  flag: true,
                  message: "Uspesno ste promenili lozinku!"
                }); 
              }
            });
          });
        }   
      });
    }).catch(err => console.log(err));
    /*bcrypt.hash(lozinka, 10).then(hash => {
      User.updateOne({korime: korime}, {"$set": {"lozinka": hash}}, (err) => {
        if(err) {
          res.status(400).json(err);
        }
        else{
          res.status(200).json("Uspesno ste promenili lozinku"); 
        }
      });
    }); */

  });
  
  router.post("/potvrdilozinku", (req, res, next) => {
    let korime = req.body.korime;
    let lozinka = req.body.lozinka;

    User.findOne({korime: korime}).then(user => {
      bcrypt.hash(lozinka, 10).then(hash => {
        User.updateOne({korime: korime}, {"$set": {"lozinka": hash}}, (err) => {
          if(err) {
            res.status(400).json(err);
          }
          else{
            res.status(200).json("Uspesno ste promenili lozinku!"); 
          }
        });
      });
    }).catch(err => console.log(err));
  });


  router.get("/:id", (req, res, next) => {
    User.findById({_id: req.params.id},  {
      _id: 0,
      ime: 1,
      prezime: 1,
      slikaPutanja: 1,
      korime: 1,
      lozinka: 1,
      datum: 1,
      grad: 1,
      drzava: 1,
      email: 1,
      privilegije: 1,
    }).then(user => {
      if (user) {
       // console.log(user);
        res.status(200).json(user);
      } else {
        res.status(400).json("Korisnik nije pronadjen!");
      }
    }).catch(err => 
      console.log(err));
  });

  router.post("/sendmail", (req, res, next) => {
    let email = req.body.email;
    User.findOne({email: email}, {_id: 0, korime:1, prihvacen:1}, (err, data) => {
      if(err) {
        res.status(400).json("Greska!");
      }
      if(!data || (data.prihvacen == false)) {
        return res.status(200).json({
          postoji: false,
          message: "Pogresna email adresa!"
        });
      } else {
        //posalji mail;
        let user = { email: email, korime: data.korime }
        console.log(user);
        sendMail(user, info => {
          console.log("Mail je poslat");
          res.status(200).json({
            postoji: true,
            message: "Uspesno poslat mail!"
          });
        });
      }
    });
   // res.status(200).json("Uspesno!");
  });

  async function sendMail(user, callback) {
   
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: "napredne.projekat@gmail.com",
        pass: "Napredne123!"
      }
    });
  
    let mailOptions = {
      from: 'napredne.projekat@gmail.com', // sender address
      to: user.email, // list of receivers
      subject: "Promena lozinke", // Subject line
      html: `<h1>Kliknite na link za promenu:</h1><br>
      <div>
      <a href="http://localhost:4200/potvrda/${user.korime}" target="_blank">Link!</a> 
      </div>`
    };
  
    // send mail with defined transport object
    let info = transporter.sendMail(mailOptions).catch(err => {
      console.log(err);
    });
  
    callback(info);
  }

  router.get("/getuser/:korime", (req, res, next) => {
    User.findOne({korime: req.params.korime},  {
      _id: 0,
      ime: 1,
      prezime: 1,
      slikaPutanja: 1,
      korime: 1,
      lozinka: 1,
      datum: 1,
      grad: 1,
      drzava: 1,
      email: 1,
      privilegije: 1,
    }).then(user => {
      if (user) {
       // console.log(user);
        res.status(200).json(user);
      } else {
        res.status(400).json("Korisnik nije pronadjen!");
      }
    }).catch(err => 
      console.log(err));
  });
  
  router.post("/lasttime", (req, res, next) => {
    let korime = req.body.korime;
    let datum = req.body.datum;
    Last.findOne({korime: korime}).then(data => {
      if(!data) {
        let last = new Last({
          korime: korime,
          datum: datum
        });
        last.save((err, createdLast) => {
          if(err) {
            res.status(400).json("Doslo je do greske!");
          }
          res.status(200).json({
            message: "Uspesno sacuvan!"
          });
        });
      } else {
        Last.updateOne({korime: korime},  {"$set": {"datum": datum}}, (err) => {
          if(err) {
            res.status(400).json("Doslo je do greske!");
          } else {
            res.status(200).json({
              message: "Uspesno sacuvan!"
            });
          }
        });
      }
    }).catch(err => {
      console.log(err);
    })
  });

  router.get("/lasttimeget/:korime1/:korime2", (req, res, next) => {
    let korime = req.params.korime1;
    let date;
    let pratilac = req.params.korime2;
    let praceni = req.params.korime1
    Last.findOne({korime: korime}).then(data => {
      if(!data) {
        date = null;
      } else {
        date = data.datum
      }
      Follow.findOne({pratilac: pratilac, praceni: praceni}).then(prati => {
        if(prati) {
          res.status(200).json({
            message: "Uspesno!",
            date: date,
            follow: true
          });
        } else {
          res.status(200).json({
            message: "Uspesno!",
            date: date,
            follow: false
          });
        }
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
    /*Last.findOne({korime: korime}).then(data => {
      if(!data) {
        res.status(200).json({
          message: "Ne postoji!",
          date: null
        });
      } else {
        res.status(200).json({
          message: "Pronadjeno",
          date: data.datum
        });
      }
    }).catch(err => {
      console.log(err);
    })*/
  });

  router.post("/zaprati", (req, res, next) => {
    let pratilac = req.body.pratilac;
    let praceni = req.body.praceni;
    let follow = new Follow({
      pratilac: pratilac,
      praceni: praceni
    });
    follow.save((err, createdFollow) => {
      if(err) {
        res.status(400).json("Doslo je do greske!");
      }
      res.status(200).json("Uspesno zapracen!");
    });
  });

  router.post("/otprati", (req, res, next) => {
    let pratilac = req.body.pratilac;
    let praceni = req.body.praceni;
    Follow.deleteOne({pratilac: pratilac, praceni: praceni}).then(result => {
      if (result.n > 0) {
        res.status(200).json("Uspesno otpracen!");
      } else {
        res.status(400).json({ message: "Greska!" });
      }
    });
  });

  router.get("/dohvatipracene/:korime", (req, res, next) => {
    let pratilac = req.params.korime;
    let pom = [];
    Follow.find({pratilac: pratilac}).then(data => {
      if(data.length != 0) {
        for(let i=0; i<data.length; i++) {
          pom.push(data[i].praceni);
        }
        res.status(200).json({
          message: "Uspesno pronadjeno",
          following: pom
        });
      } else {
        res.status(200).json({
          message: "Niz je prazan",
          following: []
        });
      }
    }).catch(err => {
      res.status(400).json("Greska!");
    })

  });


module.exports = router;