# LSPD Tools

LSPD araçlarının toplandığı ana sayfa. Her araç kendi deposunda yayınlanır; bu sayfa hepsine tek yerden
ulaşmayı sağlar ve hepsi aynı temayı kullanır.

- Canlı adres: https://chaseyuu.github.io/lspd-tools/

## Araçlar

| Araç | Adres | Depo |
|---|---|---|
| Tutuklama Hesaplayıcı | https://chaseyuu.github.io/arrest-calculator/ | [arrest-calculator](https://github.com/chaseyuu/arrest-calculator) |
| Kartvizit Oluşturucu | https://chaseyuu.github.io/kartvizit-olusturucu/ | [kartvizit-olusturucu](https://github.com/chaseyuu/kartvizit-olusturucu) |

Araçların üst çubuğundaki **LSPD Tools** yazısı bu ana sayfaya döner.

## Yeni araç ekleme

`index.html` içindeki `.tools` bölümüne yeni bir `<a class="tool">` kartı ekleyin ve `href` değerine aracın
adresini yazın.

## Tema

Bütün araçlar aynı renkleri ve kutu tasarımını kullanır:

| Öğe | Renk |
|---|---|
| Üst çubuk | `hsl(216 26% 9%)` |
| Sayfa zemini | `hsl(213 14% 20%)` |
| Kutular | `hsl(215 22% 13%)` |
| Vurgu (çelik mavisi) | `hsl(205 62% 55%)` |

Kutuların üst kenarında 4 piksellik çelik mavisi şerit bulunur. Yazı tipi olarak Inter kullanılır.

## Yayınlama

Site tek bir `index.html` dosyasından oluşur ve derleme gerektirmez. Depo ayarlarında
**Settings → Pages → Source** değeri **Deploy from a branch**, dal olarak da `main` / `(root)` seçili olmalıdır.
