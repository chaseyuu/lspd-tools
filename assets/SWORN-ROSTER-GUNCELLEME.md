# Sworn Roster Güncelleme Rehberi

Bu klasördeki `sworn-roster.js` dosyası, LSPD Sworn Personnel Roster'daki
**Adı Soyadı** ve **Seri No.** bilgilerini tutar. Rapor Oluşturucu'da (şu an
sadece Tutuklama Raporu'nda) bir memurun adı soyadı girildiğinde, seri
numarası buradan otomatik olarak bulunup dolduruluyor.

Sadece bu iki veri saklanıyor — Rütbe, Division, Cinsiyet gibi diğer
sütunlar kullanılmıyor, o yüzden roster'da onlar değişse de bu dosyayı
güncellemenize gerek yok.

## Dosyanın formatı

```js
window.SWORN_ROSTER = [
  { "name": "MORIN, KIMBERLY", "seri": "30291" },
  { "name": "MAYNARD, RUSSELL", "seri": "30327" },
  ...
];
```

- `name`: forum tablosundaki **AD** sütunu, aynı "SOYADI, ADI" formatında
  (virgülle ayrılmış, büyük harf).
- `seri`: forum tablosundaki **SERİ NUMARASI** sütunu, olduğu gibi (metin
  olarak, başında sıfır varsa o da korunur).

## Nasıl güncellenir

1. Forumdaki güncel "LSPD Sworn Personnel Roster" konusunu açın.
2. Yeni eklenen (veya seri numarası değişen) satırları bulun.
3. Her satır için `sworn-roster.js` içine şu formatta bir satır ekleyin
   (dizinin sonuna eklemek en kolayı, sırası önemli değil):

   ```js
   { "name": "SOYADI, ADI", "seri": "12345" },
   ```

4. Bir kişi listede **daha önce zaten varsa** (örn. yeniden işe alındı ve
   yeni bir seri no. aldı), eski satırı silmenize gerek yok — sadece yeni
   satırı dizinin **sonuna** ekleyin. Uygulama aynı isim birden fazla kez
   geçerse **son (en alttaki)** satırı esas alır.
5. Dosyayı kaydedip `chaseyuu/lspd-tools` deposuna (bu depo — `main` dalına)
   gönderin (commit + push, ya da Claude'a "sworn roster'ı güncelle, işte
   yeni liste" diyerek yaptırabilirsiniz). Bu depo tüm araçlar tarafından
   ortak kullanıldığı için başka bir yerde değişiklik yapmanıza gerek yok.

## Eşleştirme nasıl çalışıyor?

Bir form alanına "JOHN CLARK" gibi bir ad soyad girildiğinde:

- İlk kelime **Adı**, geri kalan kelime(ler) **Soyadı** kabul edilir
  (yani "MARY JANE SMITH" gibi çok kelimeli adlarda "MARY" adı, "JANE
  SMITH" soyadı sayılır — bu roster'daki gibi değil, formdaki diğer
  otomatik adı/soyadı ayırma mantığıyla aynıdır).
- Roster'daki `"SOYADI, ADI"` değeri virgülden ayrılıp aynı şekilde
  karşılaştırılır. Büyük/küçük harf ve baştaki/sondaki boşluklar önemli
  değildir.
- Eşleşme bulunursa seri no. otomatik dolar; bulunamazsa alan boş kalır ve
  elle girilebilir. Kullanıcı seri no. kutusuna kendisi bir şey yazarsa,
  bundan sonra o kutuya otomatik doldurma bir daha dokunmaz (elle girilen
  değer hep korunur).

## Nerede kullanılıyor / yeni bir yere eklemek

Şu an sadece **Tutuklama Raporu**'ndaki iki alanda kullanılıyor:
"Tutuklamayı Yapan İkinci Personel" (Personel Bilgisi – 2) ve "Booking
Yapan Memur Adı Soyadı". Roster dosyası `lspd-tools` içinde ortak bir yerde
tutulduğu için başka bir rapora veya araca (Kartvizit Oluşturucu, Tutuklama
Hesaplayıcı gibi) aynı otomatik doldurmayı eklemek istediğinizde de aynı
`sworn-roster.js`'yi referans göstermek yeterli olur.
