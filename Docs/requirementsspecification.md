# Követelmény Specifikáció

## 1. Jelenlegi helyzet

Az interneten számos viccportál van,ahol az emberek különféle vicceket olvashatnak különböző témákban , legyen szó Mórickás történetektől kezdve , állatos vicceken át , megbotránkoztatóbb, trágárabb viccekig . Viszont ezekkel az a baj hogy általában ezeket a felhasználó elolvassa, és nevet rajtuk, és ennyi. Ezeket általában más oldalakról vannak szedve vagy ősrégiek, ez hosszabb távon kevesebb felhasználót jelent.

Ezt szeretné a portál kicsit megváltoztatni, még pedig úgy hogy jogot add a felhasználoknak saját vicc írásában. Itt is előjöhet az ősrégi/ismételt viccek de kisebb az esély. Ezzel interaktívabb illetve személyesebbé válik a többi viccportálokhoz képest.

## 2. Vágyálom rendszer

A fejlesztés célja egy letisztult, mobilfirst, reszponzív webalkalmazás létrehozása, amely lehetővé teszi a felhasználók számára, hogy szöveges vicceket posztoljanak. A rendszer regisztráció után biztosít lehetőséget viccek beküldésére, amelyeket minden látogató elolvashat.

A felhasználók értékelhetik az egymás által írt vicceket like és dislike gombokkal. A rendszer képes ezen értékelések alapján a vicceket többféle szempontból is rendezni a viccek népszerűségétől függően. Ez segíti a felhasználókat, hogy gyorsan megtalálják a legjobb vicceket.

A moderáció egyszerű, admin jogosultsággal történik: az adminisztrátorok törölhetnek nem megfelelő bejegyzéseket, így biztosítva a közösségi szabályok betartását.

## 3. Jelenlegi üzleti folyamatok

A felhasználók vicceket többnyire közösségi médián keresztül találnak, ahol a tartalom gyakran keveredik más típusú posztokkal. A viccek megosztása spontán módon történik, nincs kategorizálás vagy minőségi szűrés. A felhasználók passzív szerepet töltenek be, nem tudnak aktívan keresni vagy szűrni a számukra releváns humoros tartalmat.

A vicces tartalom felfedezése jelenleg véletlenszerű és időigényes. A felhasználóknak több platformot kell bejárniuk, hogy megtalálják a számukra megfelelő humorstílust és témákat. Nincs hatékony keresési mechanizmus, amely lehetővé tenné a specifikus vicc-típusok gyors megtalálását.

A jelenlegi megoldások nem teszik lehetővé a felhasználók számára, hogy:

* Kedvenc vicceiket egy helyen gyűjtsék

* Személyre szabott ajánlásokat kapjanak

* Közvetlenül kapcsolatba lépjenek a vicces tartalmakat készítő alkotókkal

* Kategóriák szerint böngésszenek a számukra érdekes témakörökben

## 4. Igényelt üzleti folyamatok

1. Felhasználói regisztráció és bejelentkezés: A látógatók regisztrálhatnak az oldalon egy egyszerű űrlap segítségével (felhasználónév és jelszó megadásával). A regisztrált felhasználók bejelentkezhetnek, vicceket tölthetnek fel, valamint értékelhetik mások vicceit (like/dislike).
2. Viccfeltöltés: a bejelentkezett felhasználók új vicceket tehetnek közzé szövegmezőn keresztül. A beküldött viccek mindenki számára elérhetővé válnak. A rendszer naplózza ezek beküldési idejét és a felhasználó azonosítóját.
3. Viccek böngészése és értékelése: Minden látogató megtekintheti a vicceket. A felület lehetőséget nyújt az értékelésre, like és dislike gombokkal jelezhetik, mennyire tetszett nekik az adott vicc.
4. Rendezés népszerűség és idő alapján: A felhasználók különböző szempontok szerint rendezhetik a vicceket.
5. Moderáció: Az adminisztrátor joggal rendelkező felhasználóknak lehetőségük van törölni azokat a vicceket, melyek nem felelnek meg a felhasználói szabályoknak.
6. Reszponzív felhasználói élmény: a weboldal felülete mobiltelefonon és asztali böngészőben is kényelmesen használható. A kialakítás elsősorban mobilos elérésre optimalizált.

## 5. A rendszerre vonatkozó szabályok

### Jogszabályi megfelelés

A rendszer személyes adatokat csak jogalappal és célhoz kötötten kezel.
A szerzői jogi megfelelés érdekében a felhasználói tartalmakra egyértelmű licenc és felelősségi szabályok érvényesek, a jogsértő tartalmak eltávolítására pedig bejelentési és eltávolítási folyamat működik.
Az elektronikus kereskedelmi szolgáltatásokra vonatkozó előírások és a sütikre vonatkozó szabályok szerint átlátható tájékoztatás és hozzájárulás-kezelés szükséges.

### Szabványok és ajánlások

A hozzáférhetőség érdekében a frontend a W3C ajánlások és a WCAG 2.1 AA szint követésével készül, hogy akadálymentes élményt nyújtson minél több felhasználónak.
A biztonsági tervezés és ellenőrzés az OWASP irányelveihez igazodik, a titkosítás és jelszókezelés iparági bevált gyakorlatok szerint történik.
A minőség, hordozhatóság és karbantarthatóság érdekében nemzetközi szoftverminőségi és dokumentációs ajánlások kerülnek alkalmazásra.

### Belső működési szabályok

A rendszer a “privacy by design” és “security by design” elveket alkalmazza már a tervezési fázistól, minimalizálva az adatgyűjtést és maximalizálva a biztonságot.
A tartalommoderáció egyértelmű közösségi irányelveken és transzparens bejelentési folyamaton alapul, határidőzött válaszadással és naplózással.
Az üzemeltetés során dokumentált incidenskezelés, mentési és helyreállítási eljárások biztosítják a rendelkezésre állást és az adatbiztonságot.

### Licencelés és harmadik felek

A felhasználók a feltöltéssel nem kizárólagos, átruházható felhasználási jogot biztosítanak a tartalom tárolására és megjelenítésére, miközben a szerzői jog náluk marad.
Nyílt forrású komponensek használatakor a licencfeltételek betartása, szükséges értesítések és forráskód-közzétételi kötelezettségek teljesítése történik.

### Jövőbeli bővítések esetén

Fizetős funkciók, előfizetés vagy piactér bevezetésekor alkalmazandók az elektronikus kereskedelemre és fogyasztóvédelemre vonatkozó szabályok (pl. elállási jog, ár- és díjtranszparencia, panaszkezelés).
További adatkezelési célok (pl. profilalkotás, személyre szabott ajánlók) esetén újabb jogalapmérlegelés és érdekmérlegelés elvégzése szükséges.
Nemzetközi terjeszkedésnél a célországok adatvédelmi és fogyasztóvédelmi előírásainak megfelelőségét előzetesen ellenőrizni kell.

## 6. Követelménylista

1. Mobilfirst
2. Reszponzív dizájn
3. Értékelési rendszer (jó-rossz, like-dislike)
4. Könnyen üzemeltethető rendszer
5. Népszerűség szerinti rendszerezés
6. Két szerepkör kezelése (admin, user) - a user alapjogokkal rendelkezik posztolni és nézni tudja a vicceket, az admin pedig moderálni tudja ezeket, szükség esetén törölni

## 7. Fogalomszótár

* reszponzív: a webalkalmazás felhasználói felület az adott képernyőhoz igazodik, hogy minden képernyőméreten jól nézzen ki.
* mobilfirst: a felhasználói felület elsősorban úgy van kialakítva, hogy az elsősorban mobileszközökön jól nézzen ki.
* W3C specifikéció: <https://www.w3.org/standards/about/>
* WCAG 2.1 AA: <https://www.w3.org/TR/WCAG21/>
* OWASP irányelvei: <https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/>
