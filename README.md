# Counter Strike - Fast download server  :open_file_folder:


CS 1.6 fast download server napisan u node.js uz pomoc express.js frameworka koji olaksava koristenje ruta i postavljanje rate limitera.


Kako se koristi?
Uploadati sve fajlove na server te zatim editovati `config.js` file (sve imate objasnjeno u fajlu).

Nakon toga pokrenuti npm skriptu koja starta server.

```sh
$ npm install && npm run production
```

Nakon toga ispisat ce vam u konzolu da je webserver pokrenut. Proces je potrebno ostaviti u screen da se ne ugasi!

Note: skripta ocekuje da postoji zadano ime staticnog folderu u direktoriju, ako mijenjate ime mora se manuelno napraviti/ rename direktorij.


### Funkcije

Glavna ruta za download se satoji iz `/:userid/cstrike/:path(*)` gdje je:

* :userid - {string} id korisnika koji ima fdl server (id nije limitovan, sve zavisi kako tretirate staticni folder)

* cstrike - {string} default value bez kojeg fdl ne radi jer cs klijent ocekuje taj value u url da bi skinuo fajl

* :path(*) {string} folderi sa svim resursima koji postoje u staticnom folderu

### API 

Webserver nudi API koji:

| METHOD | ENDPOINT       | DESCRIPTION                                                                                                                                                                | NOTE                                  |
|--------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------|
| GET    | `/api/:userid` | Userid je string od kojeg dobijate informacije. Informacije koje dobijate u obliku objekta su: ` {userid: string, info: [{id: userid, download_count: int, errors: []]} `  | json response                         |
| GET    | `api/filesize` | Pozivom na ovaj endpoint dobijate velicinu databaze u MB. Ako predje 200mb reset bi bio dobar jer databaza baguje.                                                         | Ovo ne resetuje ukupni broj skidanja. |
| GET    | `api/reset`    | Resetuje databazu, tacnije sav `users` info.                                                                                                                               |               