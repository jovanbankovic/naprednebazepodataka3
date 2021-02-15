const express = require("express");
const multer = require("multer");
const bodyParser = require('body-parser');
//const moment = require("moment");

const router = express.Router();

const User = require("../models/user");
const Book = require("../models/book");
const Genre = require("../models/genre");
//const genre = require("../models/genre");
const List = require("../models/list");
const Comment = require("../models/comment");
const Follow = require("../models/follow");
//const list = require("../models/list");

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

router.post("/dodajknjigu1", multer({ storage: storage }).single("slika"), (req, res, next) => {
  let slikaPut = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  let autori = req.body.autori.split(",");
  let zanrovi = req.body.zanr.split(",");
  let book = new Book({
    slikaPutanja: slikaPut,
    naziv: req.body.naziv,
    autori: autori,
    datum: new Date(req.body.datum),//moment(new Date(req.body.datum)).format("YYYY-MM-DD"),//new Date(req.body.datum),//moment(req.body.datum).format("YYYY-MM-DD"),
    zanrovi: zanrovi,
    opis: req.body.opis,
    prosek: 0,
    zahtev: true,
    odobrena: false
  });
  book.save().then(createdBook => {
    res.status(200).json(createdBook);
  }).catch(err => {
    res.status(400).json("Greska!");
  });
});

router.post("/dodajknjigu2", (req, res, next) => {
  let autori = req.body.autori.split(",");
  //let zanrovi = req.body.zanr.toSt.split(",");  - ne znam zasto ovo ne radi - ovde je zanr tipa object tj verovatno je niz
  let book = new Book({
    slikaPutanja: req.body.slikaPutanja,
    naziv: req.body.naziv,
    autori: autori,
    datum: new Date(req.body.datum),//moment(new Date(req.body.datum)).format("YYYY-MM-DD"),//moment(new Date(req.body.datum)).add(2, 'hours'),
    zanrovi: req.body.zanr,
    opis: req.body.opis,
    prosek: 0,
    zahtev: true,
    odobrena: false
  });
  book.save().then(createdBook => {
    res.status(200).json(createdBook);
  }).catch(err => {
    res.status(400).json("Greska!");
  });
});

router.post("/dodajzanr", (req, res, next) => {
    let zanr = new Genre({
        naziv: req.body.naziv
    });
    Genre.findOne({naziv: req.body.naziv }, (err, data) => {
      if(err) {
        res.status(400).json("Desila se greska!");
      }
      if(data) {
        return res.status(200).json({
          flag: false,
          message: "Vec postoji takav zanr!"
        });
      }
      else {
        zanr.save().then(createdUser => {
          res.status(200).json({
            flag: true,
            message: "Uspesno dodat zanr!"
          });
        }).catch(err => {
          res.status(400).json("Desila se greska!");
        });
      }
    });
});

router.get("/dohvatizanrove", (req, res, next) => {
    Genre.find({}, {_id: 0, naziv:1}, (err, data) => {
        if(err) {
            res.status(400).json("Desila se greska");
          }
          else {
            res.status(200).json(data);
          }
    });
});

router.delete("/obrisizanr/:naziv", (req, res, next) => {
  //provera da li moze da se obrise zanr
  let naziv = req.params.naziv;
  Book.find({}, { _id:0, zanrovi: 1 }, (err, data) => {
    if(err) {
      res.status(400).json({message: "Desila se greska!"});
    } else {
      let postoji = false;
      data.forEach(element => {
        if(element.zanrovi.includes(naziv)) {
          postoji = true;
        }
      });
      if(postoji) {
        res.status(200).json({
          message: "Ne moze da se izbrise zanr!",
          flag: false
        });
      } else {
        Genre.deleteOne({naziv: req.params.naziv}).then(result => {
          if (result.n > 0) {
            res.status(200).json({
              message: "Uspesno obrisano!",
              flag: true
            });
          } else {
            res.status(400).json({ message: "Greska!" });
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  });

  /*.deleteOne({naziv: req.params.naziv}).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: "Uspesno obrisano!" });
    } else {
      res.status(400).json({ message: "Greska!" });
    }
  });*/
});

router.get("/zahtevi", (req, res, next) => {
  Book.find({zahtev: true}, {
    _id: 1,
    slikaPutanja:1,
    naziv: 1,
    autori: 1,
    datum: 1,
    zanrovi: 1,
    opis: 1,
    prosek: 1,
    odobrena: 1
  }, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska");
    }
    else {
      res.status(200).json(data);
    }
  });
});

router.post("/odobri", (req, res, next) => {
  let _id = req.body._id;
  Book.updateOne({_id: _id}, {"$set": {"zahtev": false, "odobrena":true}}, (err) => {
    if(err) {
      res.status(400).json(err);
    }
    else{
      res.status(200).json("Knjiga je odobrena");  
    }
  });
});

router.post("/odbaci", (req, res, next) => {
  let _id = req.body._id;
  Book.updateOne({_id: _id}, {"$set": {"zahtev": false, "odobrena":false}}, (err) => {
    if(err) {
      res.status(400).json(err);
    }
    else{
      res.status(200).json("Knjiga je odbijena");  
    }
  });
});

router.get("/sveknjige", (req, res, next) => {
  Book.find({zahtev: false}, {
    _id: 1,
    slikaPutanja:1,
    naziv: 1,
    autori: 1,
    datum: 1,
    zanrovi: 1,
    opis: 1,
    prosek: 1,
    odobrena: 1
  }, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska");
    }
    else {
      res.status(200).json(data);
    }
  });
});

router.get("/sveodobreneknjige", (req, res, next) => {
  Book.find({zahtev: false, odobrena: true}, {
    _id: 1,
    slikaPutanja:1,
    naziv: 1,
    autori: 1,
    datum: 1,
    zanrovi: 1,
    opis: 1,
    prosek: 1,
    odobrena: 1
  }, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska");
    }
    else {
      res.status(200).json(data);
    }
  });
});

router.get("/:id", (req, res, next) => {
  Book.findById(req.params.id).then(book => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(400).json("Knjiga nije nadjena");
    }
  }).catch(err => {
    console.log(err);
  });;
});

router.put("/azuriraj", (req, res, next) => {
  const book = new Book({
    _id: req.body._id,
    slikaPutanja: req.body.slikaPutanja,
    naziv: req.body.naziv,
    autori: req.body.autori,
    datum: new Date(req.body.datum),//moment(new Date(req.body.datum)).format("YYYY-MM-DD"), //req.body.datum - lose se cuva u bazu ali lepo ispisuje- dodavanje 2 sata
    zanrovi: req.body.zanrovi,
    opis: req.body.opis,
    prosek: req.body.prosek,
    zahtev: false,
    odobrena: req.body.odobrena
  });
  Book.updateOne({_id: book._id}, book, (err) => {
    if(err) {
      res.status(400).json(err);
    }
    else{
      res.status(200).json("Knjiga je azurirana");  
    }
  });
});

router.get("/info/:korime/:naziv/:autori", (req, res, next) => {
  let korime = req.params.korime;
  let naziv = req.params.naziv;
  let autori_string = req.params.autori;
  let autori = autori_string.split(",");  //dobijaju se kao string i mora da se odvoje jer su kroz params
 // console.log(autori);
  List.findOne({korime: korime, naziv: naziv, autori: autori}, {   
    _id: 0, //bilo je 0
    status: 1,
    strana: 1,
    procitano: 1,
    autori: 1
  }, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska!");
    } else {
      if(!data) {
        res.status(200).json({
          flag: false,
          message: "Ne postoji knjiga u listi",
          status: "ne_postoji",
          strana: 0,
          procitano: 0,
        });
      } else {
        //console.log(data.autori);
       /* for(let i=0; i<data.autori.length; i++) {
          if(data.autori[i] != autori[i]) {
           return res.status(200).json({
              flag: false,
              message: "Ne postoji knjiga u listi",
              status: "ne_postoji",
              strana: 0,
              procitano: 0,
            });
          }
        }*/
        res.status(200).json({
          flag: true,
          message: "Uspesno dohvacena knjiga",
          status: data.status,
          strana: data.strana,
          procitano: data.procitano,
        });
      }
    }
  });
});

router.post("/stavi", (req, res, next) => {
  let korime = req.body.korime;
  let naziv = req.body.naziv;
  let autori = req.body.autori;
  //let autori_string = req.body.autori;
 // let autori = autori_string.split(",");
  let list = new List({
    naziv: naziv,
    autori: autori,
    korime: korime,
    status: "dodata",
    strana: 100,
    procitano: 0
  });
  list.save().then(createdListbook => {
    res.status(200).json({
      message: "Uspesno sacuvano u listu!",
      status: createdListbook.status
    });
  }).catch(err => {
    res.status(400).json("Greska!");
  });
});

router.delete("/ukloni/:korime/:naziv/:autori", (req, res, next) => {
  let korime = req.params.korime;
  let naziv = req.params.naziv;
  //let autori = req.params.autori;
  let autori_string = req.params.autori;
  let autori = autori_string.split(",");
  List.deleteOne({naziv: naziv, korime: korime, autori: autori}).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Uspesno obrisano iz liste!" 
      });
    } else {
      res.status(400).json({ message: "Greska!" });
    }
  });
});

router.post("/zapocni", (req, res, next) => {
  let korime = req.body.korime;
  let naziv = req.body.naziv;
  let autori = req.body.autori;
  //let autori_string = req.body.autori;
  //let autori = autori_string.split(",");
  //treba da proverim da li postoji, ako ne postoji da dodam, a ako postoji da update
  List.findOne({korime: korime, naziv: naziv, autori: autori}, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska!");
    } else {
     if(!data) {
      let list = new List({
        naziv: naziv,
        autori: autori,
        korime: korime,
        status: "trenutno",
        strana: 100,
        procitano: 0
      });
      list.save().then(createdListbook => {
        res.status(200).json({
          message: "Zapoceto je citanje!",
          status: createdListbook.status,
          strana: 100,
          procitano: 0
        });
      }).catch(err => {
        res.status(400).json("Greska!");
      });
     } else {
      List.updateOne({naziv: naziv, autori: autori, korime: korime}, {"$set": {"status": "trenutno", "strana": 100, "procitano": 0}}, (err) => {
        if(err) {
          res.status(400).json(err);
        }
        else{
          res.status(200).json({
            message: "Zapoceto je citanje!",
            status: "trenutno",
            strana: 100,
            procitano: 0
          });  
        }
      });
     }
    }
  });  
});

router.post("/procitao", (req, res, next) => {
  let korime = req.body.korime;
  let naziv = req.body.naziv;
  let autori = req.body.autori;
  //let autori_string = req.body.autori;
  //let autori = autori_string.split(",");
  List.findOne({korime: korime, naziv: naziv, autori: autori}, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska!");
    } else {
     if(!data) {
      let list = new List({
        naziv: naziv,
        autori: autori,
        korime: korime,
        status: "procitana",
        strana: 100,
        procitano: 100
      });
      list.save().then(createdListbook => {
        res.status(200).json({
          message: "Knjiga je procitana!",
          status: createdListbook.status,
        });
      }).catch(err => {
        res.status(400).json("Greska!");
      });
     } else {
      List.updateOne({naziv: naziv, autori: autori, korime: korime}, {"$set": {"status": "procitana", "strana": 100, "procitano": 100}}, (err) => {
        if(err) {
          res.status(400).json(err);
        }
        else{
          res.status(200).json({
            message: "Knjiga je procitana!",
            status: "procitana"
          });  
        }
      });
     }
    }
  });  
});

router.post("/promena", (req, res, next) => {
  let korime = req.body.korime;
  let naziv = req.body.naziv;
  let autori = req.body.autori;
  //let autori_string = req.body.autori;
  //let autori = autori_string.split(",");
  let strana = req.body.strana;
  let procitano = req.body.procitano;
  if(strana != procitano) {
    List.updateOne({naziv: naziv, autori: autori, korime: korime}, {"$set": {"strana": strana, "procitano": procitano}}, (err) => {
      if(err) {
        res.status(400).json(err);
      }
      else{
        res.status(200).json({
          message: "Podaci su azurirani!",
          status: "trenutno"
        });  
      }
    });
  } else {
    List.updateOne({naziv: naziv, autori: autori, korime: korime}, {"$set": {"status": "procitana", "strana": strana, "procitano": strana}}, (err) => {
      if(err) {
        res.status(400).json(err);
      }
      else{
        res.status(200).json({
          message: "Knjiga je procitana!",
          status: "procitana"
        });  
      }
    });
  }
});

router.post("/unesikom", (req, res, next) => {
  let comment = new Comment({
    naziv: req.body.naziv,
    autori: req.body.autori,
    korime: req.body.korime,
    ocena: req.body.ocena,
    tekst: req.body.tekst
  });
  //console.log(req.body.tekst);
  comment.save().then(createdComment => {
    Comment.find({naziv: req.body.naziv, autori: req.body.autori}, (err, data) => {
      if(err) {
        res.status(400).json("Desila se greska");
      } else {
        let zbir = 0;
        let prosek = 0;
        data.forEach(kom => {
          zbir = zbir + kom.ocena;
        });
        prosek = parseFloat((zbir/data.length).toFixed(2));
        Book.updateOne({naziv: req.body.naziv, autori: req.body.autori}, {"$set": {"prosek": prosek}}, (err) => {
          if(err) {
            res.status(400).json(err);
          }
          else{
            res.status(200).json({
              message: "Komentar je kreiran",
              prosek: prosek,
              comment: createdComment
            });  
          }
        });
      }
   
   /* res.status(200).json({
      message: "Uspesno kreiran komentar!",
      comment: createdComment*/
    });
  }).catch(err => {
    res.status(400).json("Greska!");
  });
});

router.get("/knjigakom/:id", (req, res, next) => {
  let pom_book;
  Book.findById(req.params.id).then(book => {
    if (book) {
      pom_book = book;
      Comment.find({naziv: book.naziv, autori: book.autori}, (err, data) => {
        if(err) {
          res.status(400).json("Desila se greska");
        } else {
          if(data.length == 0) {
            res.status(200).json({
              message: "Komentari nisu pronadjeni",
              book: pom_book,
              comments: []
            });
          } else {
            res.status(200).json({
              message: "Komentari su pronadjeni",
              book: pom_book,
              comments: data,
            });
          }
        }
      });
      //res.status(200).json(book);
    } else {
      res.status(400).json("Knjiga nije nadjena");
    }
  }).catch(err => {
    res.status(400).json("Desila se greska");
  });
});

router.post("/promenikom", (req, res, next) => {
    let naziv = req.body.naziv;
    let autori = req.body.autori;
    let korime = req.body.korime;
    let ocena = req.body.ocena;
    let tekst = req.body.tekst
  Comment.updateOne({naziv: naziv, autori: autori, korime: korime}, {"$set": {"ocena": ocena, "tekst": tekst}}, (err) => {
    if(err) {
      res.status(400).json(err);
    }
    else{
      Comment.find({naziv: naziv, autori: autori}, (err, data) => {
        if(err) {
          res.status(400).json("Desila se greska");
        } else {
          let zbir = 0;
          let prosek = 0;
          data.forEach(kom => {
            zbir += kom.ocena;
          });
          prosek = parseFloat((zbir/data.length).toFixed(2));
          Book.updateOne({naziv: naziv, autori: autori}, {"$set": {"prosek": prosek}}, (err) => {
            if(err) {
              res.status(400).json(err);
            }
            else{
              res.status(200).json({
                message: "Komentar je promenjen",
                prosek: prosek
              });  
            }
          });
        }
      }); 
    }
  });
});

router.get("/spisakkom/:korime", (req, res, next) => {
  let korime = req.params.korime;
  Comment.find({korime: korime}, (err, data) => {
    if(err) {
      res.status(400).json("Desila se greska");
    } else {
      if(data.length == 0) {
        res.status(200).json({
          message: "Komentari nisu pronadjeni",
          comments: []
        });
      } else {
        res.status(200).json({
          message: "Komentari su pronadjeni",
          comments: data,
        });
      }
    }
  });
});

router.post("/idknjige", (req, res, next) => {
  let naziv = req.body.naziv;
  let autori = req.body.autori;
  Book.findOne({naziv: naziv, autori: autori}, (err, book) => {
    if(err) {
      res.status(400).json("Desila se greska!");
    } else {
      //console.log(book);
     res.status(200).json({
       message: "Uspesno pronadjeno",
       id: book._id
     });
    }
  });
});

router.get("/dohvatizapaginaciju/:korime/:knjige_po_strani/:trenutna_strana", (req, res, next) => {
  let korime = req.params.korime;
  let knjige_po_strani = +req.params.knjige_po_strani;
  let trenutna_strana = +req.params.trenutna_strana;
  const listQuery1 = List.find({korime: korime, status: "procitana"});
  const listQuery2 = List.find({korime: korime, status: "trenutno"});
  const listQuery3 = List.find({korime: korime, status: "dodata"});
  let fetchedLists1;
  let fetchedLists2;
  let fetchedLists3;
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;

  if (knjige_po_strani && trenutna_strana) {
    listQuery1.skip(knjige_po_strani * (trenutna_strana - 1)).limit(knjige_po_strani);
    listQuery2.skip(knjige_po_strani * (trenutna_strana - 1)).limit(knjige_po_strani);
    listQuery3.skip(knjige_po_strani * (trenutna_strana - 1)).limit(knjige_po_strani);
  }
  listQuery1.then(data => {
    fetchedLists1 = data;
    List.find({korime: korime, status: "procitana"}).countDocuments().then(count => {
      count1 = count;
      listQuery2.then(data => {
        fetchedLists2 = data;
        List.find({korime: korime, status: "trenutno"}).countDocuments().then(count => {
          count2 = count;
          listQuery3.then(data => {
            fetchedLists3 = data;
            List.find({korime: korime, status: "dodata"}).countDocuments().then(count => {
              count3 = count;
              res.status(200).json({
                message: "Uspesno pronadjeno",
                list1: fetchedLists1,
                count1: count1,
                list2: fetchedLists2,
                count2: count2,
                list3: fetchedLists3,
                count3: count3
              });
            });
          });
        });
      });
    }).catch(err => {
      console.log(err);
    });
  });
  /*listQuery
  .then(documents => {
    fetchedLists = documents;
    return List.find({korime: korime, status: "procitana"}).countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      lists: fetchedLists,
      count: count
    });
  });*/
});

router.get("/procitaneknjige/:korime/:knjige_po_strani/:trenutna_strana", (req, res, next) => {
  let korime = req.params.korime;
  let knjige_po_strani = +req.params.knjige_po_strani;
  let trenutna_strana = +req.params.trenutna_strana;
  const listQuery = List.find({korime: korime, status: "procitana"});
  let fetchedLists;
  if (knjige_po_strani && trenutna_strana) {
    listQuery.skip(knjige_po_strani * (trenutna_strana - 1)).limit(knjige_po_strani);
  }
  listQuery
  .then(documents => {
    fetchedLists = documents;
    return List.find({korime: korime, status: "procitana"}).countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      lists: fetchedLists,
      count: count
    });
  });
});

router.get("/trenutnoknjige/:korime/:knjige_po_strani/:trenutna_strana", (req, res, next) => {
  let korime = req.params.korime;
  let knjige_po_strani = +req.params.knjige_po_strani;
  let trenutna_strana = +req.params.trenutna_strana;
  const listQuery = List.find({korime: korime, status: "trenutno"});
  let fetchedLists;
  if (knjige_po_strani && trenutna_strana) {
    listQuery.skip(knjige_po_strani * (trenutna_strana - 1)).limit(knjige_po_strani);
  }
  listQuery
  .then(documents => {
    fetchedLists = documents;
    return List.find({korime: korime, status: "trenutno"}).countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      lists: fetchedLists,
      count: count
    });
  });
});

router.get("/listaknjige/:korime/:knjige_po_strani/:trenutna_strana", (req, res, next) => {
  let korime = req.params.korime;
  let knjige_po_strani = +req.params.knjige_po_strani;
  let trenutna_strana = +req.params.trenutna_strana;
  const listQuery = List.find({korime: korime, status: "dodata"});
  let fetchedLists;
  if (knjige_po_strani && trenutna_strana) {
    listQuery.skip(knjige_po_strani * (trenutna_strana - 1)).limit(knjige_po_strani);
  }
  listQuery
  .then(documents => {
    fetchedLists = documents;
    return List.find({korime: korime, status: "dodata"}).countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      lists: fetchedLists,
      count: count
    });
  });
});

router.post("/piechart", (req, res, next) => {
  let korime = req.body.korime;
  List.find({korime: korime, status: "procitana"}).then(data => {
   
    if(data.length == 0) {
      res.status(200).json({
        message: "Nema knjiga",
        array: []
      });
    }
    else {  
      let pom = [];
      let i = 0;
      let poslednji = false;
      let brojac = 0;
      for(let j=0; j<data.length; j++) {
        Book.findOne({naziv: data[j].naziv, autori: data[j].autori}, (err, book) => {
          if(err) {
            res.status(400).json("Desila se greska");
          }
          else {
            for(let k=0; k<book.zanrovi.length; k++) {
              pom[i] = book.zanrovi[k];
              i++;
            }
          }
          brojac++;
          
          if(brojac==data.length) {         // ne znam da li ovako moze!!!
            res.status(200).json({
              message: "Uspesno!",
              array: pom
            });
          }
          //console.log(pom);
        });
      }
      /*console.log("Prosao");
      res.status(200).json({
        message: "Uspesno!",
        array: pom
      });*/
    }
  }).catch(err => console.log(err));
});


router.post("/praceni", (req, res, next) => {
    let pratilac = req.body.korime;
    Follow.find({pratilac: pratilac}).then(data => {
      if(data.length == 0) {
        res.status(200).json({
          message: "Nema knjiga",
          array: []
        });
      } else {
       
        let pom = [];
        let brojac = 0;
        for(let j=0; j<data.length; j++) {
          Comment.find({korime: data[j].praceni}, (err, comments) => {
            if(err) {
              res.status(400).json("Desila se greska");
            }
            else {
              if(comments.length != 0) {
                for(let k=0; k<comments.length; k++) {
                  pom.push(comments[k]);
                }
              }
            }
            brojac++;
            
            if(brojac==data.length) {         
              res.status(200).json({
                message: "Uspesno!",
                array: pom
              });
            }
          });
        }
      }
    }).catch(err => {
      console.log(err);
    });
});




module.exports = router;