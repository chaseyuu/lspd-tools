# LSPD Tools

LSPD araçlarının toplandığı ana sayfa. Her araç kendi deposunda yayınlanır; bu sayfa hepsine tek yerden
ulaşmayı sağlar ve hepsi aynı temayı kullanır.

- Canlı adres: https://chaseyuu.github.io/lspd-tools/

## Araçlar

| Araç | Adres | Depo |
|---|---|---|
| Tutuklama Hesaplayıcı | https://chaseyuu.github.io/arrest-calculator/ | [arrest-calculator](https://github.com/chaseyuu/arrest-calculator) |
| Kartvizit Oluşturucu | https://chaseyuu.github.io/kartvizit-olusturucu/ | [kartvizit-olusturucu](https://github.com/chaseyuu/kartvizit-olusturucu) |
| Rapor Oluşturucu | https://chaseyuu.github.io/lspd-paperwork-generator/ | [lspd-paperwork-generator](https://github.com/chaseyuu/lspd-paperwork-generator) |

Araçların üst çubuğundaki **LSPD Tools** yazısı bu ana sayfaya gider. Sağ üstte seçili karakterin adı yazar;
üzerine tıklanınca diğer karaktere geçilebilir ya da **Karakterleri Düzenle** ile ayarlar sayfası açılır.
Henüz karakter tanımlanmamışsa bu alanda **Karakter Tanımla** bağlantısı görünür.

## Ayarlar

Ayarlar sayfası (`settings/`, https://chaseyuu.github.io/lspd-tools/settings/) şunları saklar:

- **Görünüm:** Koyu ya da açık tema. Ana sayfa, ayarlar ve Tutuklama Hesaplayıcı bu seçimi kullanır.
- **Personel Bilgisi:** En fazla iki karakter (**Ana Karakter** ve **Alt Karakter**). Her biri için Ad Soyadı,
  Rütbe (Officer, Detective, Sergeant, Lieutenant, Captain), Seri No. ve Division (MISN, MISN B, CTD, METRO, ASD, VES)
  girilir. Araçlar sağ üstten seçilen karakterin bilgilerini kullanır.

Bilgiler yalnızca kullanıcının tarayıcı çerezlerinde, bir yıl süreyle tutulur; hiçbir sunucuya gönderilmez.
Bütün araçlar `chaseyuu.github.io` altında olduğu için çerezleri ortak kullanabilirler:

| Çerez | İçerik |
|---|---|
| `lspd_theme` | `dark` ya da `light` |
| `lspd_characters` | `{ active: 0 ya da 1, list: [{ name, rank, badge, division }, ...] }` (JSON, en fazla 2 karakter) |

Çerez okuma ve yazma işlemleri `assets/prefs.js`, sağ üstteki karakter seçici ise `assets/character-switcher.js`
dosyasındadır. Eski `lspd_personnel` çerezi varsa otomatik olarak Ana Karakter'e taşınır.

## Yeni araç ekleme

`index.html` içindeki `.tools` bölümüne yeni bir `<a class="tool">` kartı ekleyin ve `href` değerine aracın
adresini yazın. Ortak stiller `assets/theme.css` dosyasındadır.

## Tema

Bütün araçlar aynı renkleri ve kutu tasarımını kullanır:

| Öğe | Renk |
|---|---|
| Üst çubuk | `hsl(216 26% 9%)` |
| Sayfa zemini | `hsl(213 14% 20%)` |
| Kutular | `hsl(215 22% 13%)` |
| Vurgu (çelik mavisi) | `hsl(205 62% 55%)` |

Kutuların üst kenarında 4 piksellik çelik mavisi şerit bulunur. Yazı tipi olarak Segoe UI (yoksa Open Sans) kullanılır.

## Yayınlama

Site statik HTML, CSS ve JavaScript dosyalarından oluşur ve derleme gerektirmez. Depo ayarlarında
**Settings → Pages → Source** değeri **Deploy from a branch**, dal olarak da `main` / `(root)` seçili olmalıdır.
