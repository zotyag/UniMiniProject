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

## 11. Telepítési terv

## 12. Karbantartási terv
