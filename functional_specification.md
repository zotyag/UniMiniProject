# Funkcionális Specifikáció

## 1\. Jelenlegi helyzet

Több viccoldal van, de ezek mind sablonosak, vagyis régi viccek tömkelege ,amelyeket különböző forrásokból gyűjtöttek össze, amit a felhasználók csak elolvasnak. Ennek hátránya, hogy a felhasználok megunják, kevés időt töltenek az oldalon, ami új felhasználók hiányát fogja eredményezni hosszú távon.

Erre kellett egy megoldás, ami interaktívabbá teszi ezt a sablont és add esélyt a felhasználóknak. Ehhez a következő funkciók szükségesek:

   * A felhasználóknak jogot kell adni saját viccek beküldésére

   * Szűrni lehessen az adott vicceket

   * Felhasználok kifejthetik véleményüket tetszik/nem tetszik (like-dislike) formában a viccekről

   * A beküldött vicceket az adminok moderálni tudják



## 2\. Vágyálom rendszer

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

## 3\. Jelenlegi üzleti folyamatok

## 4\. Igényelt üzleti folyamatok

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

## 5\. Követelménylista

### 1\. Felhasználókezelés

#### 1.1. Regisztráció

* 1.1.1 A rendszernek lehetővé kell tennie új felhasználók regisztrációját.
* 1.1.2 A regisztráció során felhasználónév és jelszó megadása kötelező.
* 1.1.3 A rendszer ellenőrízze, hogy a felhasználónév egyedi.
* 1.1.4 A regisztráció után a felhasználó automatikusan "user" jogosultságot kap
* 1.1.5 A jelszót biztonságosan kell tárolni (hash-elve).

#### 1.2. Bejelentkezés

* 1.2.1 A felhasználó be tud jelentkezni érvényes adatokkal.
* 1.2.2 Sikertelen bejelentkezés esetén hibaüzenetet kell megjeleníteni.
* 1.2.3 A rendszer kezelje a felhasználói munkamenetet (session vagy token).

#### 1.3. Jogosultságkezelés

* 1.3.1 A rendszer kétféle jogosultságot kezel: "user" és "admin"
* 1.3.2 A "user" szerepkörrel rendelkező felhasználó saját vicceket tehet közzé.
* 1.3.3 Az "admin" szerepkörrel rendelkező felhasználó bármely viccet törölhet.

### 2\. Vicckezelés

#### 2.1. Új vicc beküldése

* 2.1.1 Csak bejelentkezett felhasználók küldhetnek be viccet.
* 2.1.2 A vicc tartalma nem lehet üres, minimális hosszt ell kell érnie.
* 2.1.3 A rendszer mentse el a vicc szövegét, beküldő felhasználó nevét és az időbélyeget.
* 2.1.4 A beküldés után a vicc azonnal megjelenjen a főoldalon.

#### 2.2. Viccek megjelenítése

* 2.2.1 Minden látogató számára elérhető a viccek listája.
* 2.2.2 A lista alapértelmezés szerint időrendben legyen rendezve (legújabb elöl).
* 2.2.3 Minden vicchez meg kell jeleníteni:

  * Beküldő felhasználónevét
  * Beküldés időpontját
  * Like/dislike számot

#### 2.3. Rendezés

* 2.3.1 A felhasználó válthat rendezési módok között:

  * Népszerűség szerint (legtöbb pozitív értékeléssel rendelkező elöl)
  * Időrend szerint (legújabb elöl)

* 2.3.2 A rendezés ne okozzon újratöltést (lehetőleg dinamikusan történjen)

#### 2.4. Vicc törlése

* 2.4.1 Az admin törölheti bármely felhasználó viccét.
* 2.4.2 Törlés előtt megerősítő kérdést kell megjeleníteni.

### 3\. Értékelés

#### 3.1. Like/dislike funkció

* 3.1.1 Csak bejelentkezett felhasználók értékelhetnek.
* 3.1.2 Minden felhasználó egy viccet egyszer értékelhet.
* 3.1.3 A felhasználó módosíthatja az értékelését.
* 3.1.4 A rendszer frissítse a vicc aktuális like/dislike számát.

#### 3.2. Népszerűség számítása

* 3.2.1 A népszerűség számítása: like-ok száma minusz dislike-ok száma.
* 3.2.2 A népszerűségi sorrend e szám alapján történjen csökkenő sorrendben.

### 4\. Felület és dizájn

#### 4.1. Mobil-first reszponzív dizájn

* 4.1.1 Az oldal alapértelmezett nézete mobilra optimalizált legyen.
* 4.1.2 Az oldal kinézete illeszkedjen tableten és asztali nézetben is.
* 4.1.3 A felületelemek könnyen használhatóak legyenek érintőképernyőn.

#### 4.2. Felhasználói élmény

* 4.2.1 A visszajelzések (pl. sikeres bejelentkezés, vicc törölve) jelenjenek meg azonnal.
* 4.2.2 Hibás művelet esetén részletes hibaüzenetet kell adni.

### 5\. Biztonság és adatvédelem

#### 5.1. Adatkezelés

* 5.1.1 A jelszavakat biztonságosan kell tárolni.
* 5.1.2 A rendszer ne tároljon érzékeny adatokat nyílt formában.

#### 5.2. Jogosultság-ellenőrzés

* 5.2.1 Minden művelet előtt ellenőrizni kell a felhasználó szerepkörét.
* 5.2.2 Az admin funkciók nem érhetőek el "user" szerepkörrel.

## 6\. Használati esetek

## 7\. Megfeleltetés, hogyan fedik le a használati esetek a követelményeket

Vegyük ezeket sorba:



* Felhasználó kezelés: A felhasználók képesek regisztrálni az oldalra, egy beléptető rendszer segítségével, amit az adminok biztosítanak. Később a felhasználók képesek 	bejelentkezni az oldalra, a regisztrált adatok megadásával.



* Vicckezelés: A felhasználók tudnak vicceket beküldeni, de csak akkor ha be vannak jelentkezve, ha nincsenek akkor csak nézni tudják ezeket. A felhasználók neve megjelenik 	ezeknél a vicceknél. A vicceket tudják rendezni népszerűség, illetve időrend szerint. Az adminok képesek a vicceket törlöni, ha úgy gondolják nem oda való, vagy az oldal 	szabályzatának 	nem felelnek meg.



* Értékelés: A felhasználók csak akkor tudnak egy viccet like-olni vagy dislike-olni, ha be vannak jelentkezve. Ezt a felhasználók megváltoztathatják idővel, de csak egy like 	vagy dislikeot adhatnak. Minél több likeot adnak a felhasználók egy viccre annál népszerűbb lesz.



* Felület és dizájn: Az adminoknak létre kell hozniuk egy olyan felületet, amit a felhasználók jól tudnak használni telefonon/tableten illetve számítógépen is. Azonnal kapni 	fognak 	a felhasználók értesítést, sikeres vagy sikertelen bejelentkezésről illetve arról is, ha egy viccük törölve lett.



* Biztonság és adatvédelem: Az adminoknak biztosra kell menniük, hogy a felhasználók adatait biztonságos helyen tárolják amihez csak ők férhetnek hozzá. Valamint "userek" nem 	rendelkezhetnek az admin szerepkör funkcióival.

## 8\. Fogalomszótár

* reszponzív: a webalkalmazás felhasználói felület az adott képernyőhoz igazodik, hogy minden képernyőméreten jól nézzen ki.
* mobilfirst: a felhasználói felület elsősorban úgy van kialakítva, hogy az elsősorban mobileszközökön jól nézzen ki.
