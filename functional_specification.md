# Funkcionális Specifikáció

## 1. Jelenlegi helyzet

## 2. Vágyálom rendszer

Az rendszer célja, hogy egy egyszerű, modern, mobilbarát weboldalt biztosítson a felhasználók számára, ahol vicceket oszthatnak meg egymással, valamint értékelhetik és böngészhetik mások bejegyzéseit.

A rendszer az alábbi főbb funkciókat látja el:

1. Felhasználói hitelesítés / jogosultságkezelés
    * Felhasználók regisztrálhatnak (név + jelszó)
    * Belépés után a felhasználók "user" vagy "admin" szerepkörrel rendelkeznek.
    * Csak belépett felhasználók posztolhatnak, értékelhetnek.
2. Vicckezelés
    * Új vicc létrehozása (POST)
    * Viccek listázása időrendben / népszerűség szerint (GET)
    * Vicc értékelése (like/dislike) (POST/PUT)
    * Vicc törlése csak admin által (DELETE)
3. Felhasználói műveletek
    * Saját viccek azonosíthatók (külön szűrhetőek)
    * Egy felhasználó egy viccet csak egyszer érétkelhet, de az értékelés módosítható
4. Admin funkciók
    * Bármely vicc törlése
    * Jogosultság-ellenőrzés minden művelet előtt.
5. Felület
    * Mobil-first, reszponzív dizájn
    * Egyszerű UI a következő oldalakra:
        * Főoldal (viccek listája)
        * Belépés / regisztráció
        * Vicc beküldése
        * Rendezés kiválasztása

## 3. Jelenlegi üzleti folyamatok

## 4. Igényelt üzleti folyamatok

Jelenleg a felhasználók számára nem áll rendelkezésre egy dedikált, könnyen használható weboldal, ahol egyszerűen, gyorsan és strukturáltan tudnának vicceket megosztani, illetve értékelni mások vicceit.

A humoros tartalmak jelenleg elszórtan, különböző platformokon (pl. közösségi médiában, fórumokon, képes oldalak kommentjeiben) találhatók, ahol:

* A tartalom gyakran elveszik a többi bejegyzés között,
* Nincs dedikált felület kizárólag viccek számára,
* Nincs mód az ilyen tartalmak rendezésére, értékelésére egy erre kialakított módon,
* A moderáció (pl. sértő tartalom törlése) gyakran nem elég gyors vagy megbízható

A tervezett rendszer célja, hogy ezt a széttagolt folyamatot leváltsa egy központi, strukturált és könnyen hozzáférhető platformmal, ahol:

* A felhasználók regisztráció után vicceket oszthatnak meg,
* Mások vicceit értékelhetik, ezáltal a közösség kiemelheti a legnépszerűbb tartalmakat,
* A viccek időrendben vagy népszerűség szerint rendezhetőek, így könnyen lehet böngészni őket,
* Az adminisztrátorok moderálhatják a tartalmakat, biztosítva a kulturált hangnemet

A rendszer tehát hatékonyabbá, áttekinthetőbbé és élvezhetőbé teszi a humoros tartalmak létrehozását, megosztását és fogyasztását egy közösségi alapon működő online felületen

## 5. Használati esetek

## 6. Megfeleltetés, hogyan fedik le a használati esetek a követelményeket

## 7. Fogalomszótár

* reszponzív: a webalkalmazás felhasználói felület az adott képernyőhoz igazodik, hogy minden képernyőméreten jól nézzen ki.
* mobilfirst: a felhasználói felület elsősorban úgy van kialakítva, hogy az elsősorban mobileszközökön jól nézzen ki.
