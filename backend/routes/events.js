const express = require("express");
const bodyParser = require('body-parser');


const router = express.Router();

const Event = require("../models/event");

router.post("/javno", (req, res, next) => {
    let naziv = req.body.naziv;
    let pocetak = req.body.pocetak;
    let kraj = req.body.kraj;
    let opis = req.body.opis;
    let kreator = req.body.kreator;
    let tip = req.body.tip;
    let status = req.body.status;

    let pom_ucesnici = [];
    pom_ucesnici.push(kreator);    
    
    let event = new Event({
        naziv: naziv,
        pocetak: pocetak,
        kraj: kraj,
        opis: opis,
        kreator: kreator,
        tip: tip,
        status: status,
        zahtevi: [],
        ucesnici: pom_ucesnici,
        autori: [],
        poruke: []
    });
    
    event.save().then(createdEvent => {
        res.status(200).json({
            message: "Uspesno kreiran dogadjaj!",
            event: createdEvent
        });
      }).catch(err => {
        res.status(400).json("Greska!");
      });
});

router.post("/privatno", (req, res, next) => {
    let naziv = req.body.naziv;
    let pocetak = req.body.pocetak;
    let kraj = req.body.kraj;
    let opis = req.body.opis;
    let kreator = req.body.kreator;
    let tip = req.body.tip;
    let status = req.body.status;
    let praceni = req.body.praceni;

    praceni.push(kreator);    
    
    let event = new Event({
        naziv: naziv,
        pocetak: pocetak,
        kraj: kraj,
        opis: opis,
        kreator: kreator,
        tip: tip,
        status: status,
        zahtevi: [],
        ucesnici: praceni,
        autori: [],
        poruke: []
    });
    
    event.save().then(createdEvent => {
        res.status(200).json({
            message: "Uspesno kreiran dogadjaj!",
            event: createdEvent
        });
      }).catch(err => {
        res.status(400).json("Greska!");
      });
});


router.get("/dohvatisve", (req, res, next) => {
    Event.find().then(data => {
        if(data.length == 0) {
            res.status(200).json({
                message: "Nema desavanja!",
                events: []
            });
        }
        else { //provera da li je desavanje pocelo ili se zavrsilo
            res.status(200).json({
                message: "Ima desavanja!",
                events: data
            });
        }
    }).catch(err => {
        console.log(err);
    })
    //res.status(200).json("Uspesno");
});


router.get("/:id", (req, res, next) => {
    Event.findById(req.params.id).then(event => {
        let pom_event;
      if (event) {
        pom_event = event;
        //provera da li je mozda pocelo ili se zavrsilo
        let pocetak = new Date(event.pocetak);
        let kraj = null;
        if(event.kraj != null) {
            kraj = new Date(event.kraj);
        }
      
        /*if((pocetak.getTime() <= Date.now()) && (event.status == "neaktivno")) {
            Event.updateOne({_id: pom_event._id}, {"$set": {"status": "aktivno"}}, (err) => {
                if(err) {
                  res.status(400).json(err);
                }
                else{
                    pom_event.status = "aktivno";
                    res.status(200).json(pom_event);  
                }
              });
        } else {
            if((kraj != null) && (kraj.getTime() <= Date.now()) && (event.status != "zavrseno") && ((event.status == "zatvoreno") || (event.status == "aktivno"))) {
                Event.updateOne({_id: pom_event._id}, {"$set": {"status": "zavrseno"}}, (err) => {
                    if(err) {
                      res.status(400).json(err);
                    }
                    else{
                        pom_event.status = "zavrseno";
                        res.status(200).json(pom_event);  
                    }
                  });
            } else {
                res.status(200).json(pom_event);
            }
        }*/
       
        if( (kraj != null) && (kraj.getTime() <= Date.now()) && (event.status != "zavrseno")) {
            Event.updateOne({_id: pom_event._id}, {"$set": {"status": "zavrseno"}}, (err) => {
                if(err) {
                  res.status(400).json(err);
                }
                else{
                    pom_event.status = "zavrseno";
                    res.status(200).json(pom_event);  
                }
              });
        } else {
            if((pocetak.getTime() <= Date.now()) && (event.status == "neaktivno")) {
                Event.updateOne({_id: pom_event._id}, {"$set": {"status": "aktivno"}}, (err) => {
                    if(err) {
                      res.status(400).json(err);
                    }
                    else{
                        pom_event.status = "aktivno";
                        res.status(200).json(pom_event);  
                    }
                  });
            } else {
                res.status(200).json(pom_event);
            }
        }
      } else {
        res.status(400).json("Dogadjaj nije pronadjen!");
      }
    }).catch(err => {
      console.log(err);
    });;
  });

  router.post("/aktiviraj", (req, res, next) => {
    Event.findById(req.body._id).then(data => {
        Event.updateOne({_id: data._id}, {"$set": {"status": "aktivno"}}, (err) => {
            if(err) {
              res.status(400).json(err);
            }
            else{
                res.status(200).json("Uspesno azurirano!");  
            }
          });
    }).catch(err => {
        console.log(err);
    })
});

router.post("/zatvori", (req, res, next) => {
    Event.findById(req.body._id).then(data => {
        Event.updateOne({_id: data._id}, {"$set": {"status": "zatvoreno"}}, (err) => {
            if(err) {
              res.status(400).json(err);
            }
            else{
                res.status(200).json("Uspesno azurirano!");  
            }
          });
    }).catch(err => {
        console.log(err);
    })
});

router.post("/pristupijavno", (req, res, next) => {
    let _id = req.body.id;
    let korime = req.body.korime;
    Event.findById(_id).then(data => {
        let ucesnici = data.ucesnici;
        ucesnici.push(korime);
        Event.updateOne({_id: _id}, {"$set": {"ucesnici": ucesnici}}, (err) => {
            if(err) {
              res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    ucesnici: ucesnici,
                    message: "Uspesno azurirano!"
                });  
            }
          });
    }).catch(err => {
        console.log(err);
    })
});

router.post("/zahtevprivatni", (req, res, next) => {
    let _id = req.body.id;
    let korime = req.body.korime;
    Event.findById(_id).then(data => {
        let zahtevi = data.zahtevi;
        zahtevi.push(korime);
        Event.updateOne({_id: _id}, {"$set": {"zahtevi": zahtevi}}, (err) => {
            if(err) {
              res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    zahtevi: zahtevi,
                    message: "Uspesno azurirano!"
                });  
            }
          });
    }).catch(err => {
        console.log(err);
    })
});

router.post("/prihvati", (req, res, next) => {
    let _id = req.body.id;
    let korime = req.body.korime;
    Event.findById(_id).then(data => {
        let zahtevi = data.zahtevi;
        let ucesnici = data.ucesnici;
        zahtevi.forEach((zahtev,index) => {
            if(zahtev == korime) {
                zahtevi.splice(index, 1);
            }
        });
        ucesnici.push(korime);
        Event.updateOne({_id: _id}, {"$set": {"zahtevi": zahtevi, "ucesnici": ucesnici}}, (err) => {
            if(err) {
              res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    zahtevi: zahtevi,
                    ucesnici: ucesnici,
                    message: "Uspesno azurirano!"
                });  
            }
          });
    }).catch(err => {
        console.log(err);
    })
});

router.post("/odbaci", (req, res, next) => {
    let _id = req.body.id;
    let korime = req.body.korime;
    Event.findById(_id).then(data => {
        let zahtevi = data.zahtevi;  
        zahtevi.forEach((zahtev,index) => {
            if(zahtev == korime) {
                zahtevi.splice(index, 1);
            }
        });
        Event.updateOne({_id: _id}, {"$set": {"zahtevi": zahtevi}}, (err) => {
            if(err) {
              res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    zahtevi: zahtevi,        
                    message: "Uspesno azurirano!"
                });  
            }
          });
    }).catch(err => {
        console.log(err);
    })
});

router.post("/unesi", (req, res, next) => {
    let _id = req.body.id;
    let korime = req.body.korime;
    let tekst = req.body.tekst;
    Event.findById(_id).then(data => {
        let autori = data.autori;
        let poruke = data.poruke;
        autori.push(korime);
        poruke.push(tekst);
        Event.updateOne({_id: _id}, {"$set": {"autori": autori, "poruke": poruke}}, (err) => {
            if(err) {
              res.status(400).json(err);
            }
            else{
                res.status(200).json({
                    autori: autori,
                    poruke: poruke,
                    message: "Uspesno azurirano!"
                });  
            }
          });
    }).catch(err => {
        console.log(err);
    })
});


module.exports = router;