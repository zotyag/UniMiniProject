# Rendszerterv

## 1. A rendszer célja

## 2. Üzleti folyamatok modellje

## 3. Követelmények

## 4. Funkcionális terv

## 5. Fizikai környezet

## 6. Absztrakt domain modell

## 7. Architekturális terv

## 8. Adatbázis terv

## 9. Implementációs terv

### Web

A webes felület főként HTML, CSS és Javascript nyelven készül. A kódot úgy szervezzük, hogy a HTML, CSS és Javascript fájlok külön-külön legyenek, és egymáshoz csatolva szolgálják ki az oldalak logikáját és megjelenését. Ez biztosítja a jobb átláthatóságot, a könnyebb karbantarthatóságot és a jövőbeni bővítést.

A frontend képes lesz a backend REST API metódusait használni: alkalmazás Javascript fetch hívásokkal kommunikál a Node.js szerverrel, így tudja lekérdezni a posztokat, létrehozni új vicceket, kezelni a like/dislike gombokat, valamint a felhasználói regisztrációt és bejelentkezést.

### Backend

A backend a Node.js környezetben futó Express szerver lesz, amely REST API-kat biztosít a frontend számára. A szerver feladata az adatbázis kezelése, a felhasználók hitelesítése, a posztok létrehozása és módosítása, valamint az adminisztrációs jogosultságok kezelése. A jelszavakat bcrypt könyvtárral titkosítjuk, a felhasználói munkameneteket pedig express-session segítségével kezeljük.

### Adatbázis

Az adatbázis PostgreSQL lesz, ahol két fő tábla található: 'users' a felhasználói adatokhoz és 'posts' a viccekhez. A backend ezen keresztül kommunikál az adatok beszúrására, lekérdezésére és frissítésére.

### Integráció és működés

A felhasználó böngészője a frontend HTML oldalakat tölti be, a JavaScript fetch hívások segítségével küldi el a kéréseket a backend REST API-nak. A backend feldolgozza a kéréseket, végrehajtja az adatbázis műveleteket, majd JSON formátumban visszaküldi az eredményt. A frontend ezt feldolgozza, és frissíti a DOM-ot, így a felhasználó valós időben látja a posztok és értékelések változásait.

## 10. Tesztterv

A tesztelés célja annak biztosítása, hogy az alkalmazás minden funkciója a specifikációnak megfelelően működjön, a felhasználói élmény stabil és biztonságos legyen, valamint a backend és az adatbázis helyesen kommunikáljon.

A tesztelés során ellenőrízzük:

* A felhasználói interakciókat (regisztráció, bejelentkezés, poszt létrehozás, like/dislike)
* Az adminisztrátori funkciókat
* A frontend-backend kommunikációt (fetch API hívások)
* Az adatbázis műveleteket
* A biztonsági és hozzáférési szabályokat (jelszó titkosítás, jogosultságok)
* A reszponzív megjelenést különböző képernyőméreteken.

### Tesztelés típusa

* Funkcionális teszt: ellenőrízzük, hogy minden funkció megfelelően működik a felhasználói és admin felületen.
* Integrációs teszt: a frontend és backend közötti adatátvitel, API hívások helyessége
* Adatbázis teszt: a táblákon végrehajtott műveletek helyessége (INSERT, SELECT, UPDATE, DELETE)
* Biztonsági teszt: jelszó titkosítás, jogosultságok.
* UI teszt: az oldal mobilon és desktopon is használható és jól olvasható.
* Hiba- és kivételkezelési teszt: hibás login, üres mező, nem létező poszt törlése, stb.

### Tesztelési folyamat

#### Regisztráció és bejelentkezés

* Pozitív teszt:
  * Új felhasználó regisztrálása érvényes adatokkal.
  * Bejelentkezés a regisztrált felhasználóval
* Negatív teszt:
  * Üres mezők, már létező felhasználónév, hibás jelszó
* Várható eredmény:
  * Sikeres regisztráció/bejelentkezés -> átirányítás index.html-re
  * Hibás adatok -> felhasználó értesítése, backend nem menti el az adatot

#### Poszt létrehozása és lekérése

* Tesztelés:
  * Belépett felhasználó új viccet posztol
  * Poszt megjelenik a főoldalon
  * Poszt rendezése: legújabb/legnépszerűbb
* Várható eredmény:
  * Poszt helyesen jelenik meg, időbélyeg és szerző látható
  * Rendezés a like/dislike értékek vagy timestamp szerint működik

#### Poszt értékelése

* Tesztelés:
  * Felhasználó értékeli a posztokat
  * Ellenőrizzük a backend és adatbázis értékek frissülését
* Várható eredmény:
  * Like/dislike számláló valós időben frissül

#### Admin funkciók

* Tesztelés:
  * Admin felhasználó töröl egy posztot
* Várható eredmény:
  * Admin törlése sikeres

#### Biztonsági teszt

* Jelszavak az adatbázisban hash-elve tárolódnak
* Session kezelés ellenőrzése (bejárható oldalak, kijelentkezés)
* Hozzáférés ellenőrzése admin funkciókhoz

#### UI és reszponzivitás

* Böngésző ablak átméretezése, mobil eszközön tesztelés.
* Minden oldal és funkció használható legyen kisebb képernyőn is.

#### Hiba- és kivételkezelés

* Üres mezők, rossz adatbevitel, hibás poszt ID, offline állapot tesztelése.
* Backend helyesen küldjön státuszkódokat és hibaüzeneteket.

## 11. Telepítési terv

A szoftver webes felületéhez csak egy ajánlott böngésző telepítése szükséges (Google Chrome, Firefox, Opera, Safari), külön szoftver nem kell hozzá. A webszerverre közvetlenül az internetről kapcsolódnak rá a kliensek.

## 12. Karbantartási terv

A karbantartás célja, hogy az alkalmazás stabil, biztonságos és naprakész maradjon a használat során, valamint biztosítsa a gyors hibajavítást és a további fejlesztések lehetőségét.

### Karbantartás típusai

1. Corrective Maintenance: A felhasználók vagy tesztelők által jelzett hibák javítása.
2. Adaptive Maintenance: A rendszer frissítése a környezet változásai miatt.
3. Perfective Maintenance: Új funkciók hozzáadása, teljesítmény és megbízhatóság javítása.
4. Preventive Maintenance: Olyan problémák elhárítása, amelyek még nem kritikusak, de később problémát okozhatnak.

### Karbantartási folyamat

1. Hiba vagy igény észlelése: felhasználói jelentés, tesztelés vagy fejlesztői megfigyelés
2. Elemzés és osztályozás: hibajavítás, környezeti frissítés vagy funkcióbővítés szükséges-e.
3. Módosítás: a hibát, frissítést vagy új funkciót implementáljuk a megfelelő modulba
4. Tesztelés: az érintett funkciók újratesztelése unit és integrációs tesztekkel.
5. Deployment: a frissített alkalmazás telepítése
6. Dokumentálás: minden változást dokumentálni kell, verziókövetéssel és commit üzenetekkel.
