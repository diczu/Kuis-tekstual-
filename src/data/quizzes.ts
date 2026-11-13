export interface OptionItem {
  id: string;
  text: string;
}

export type QuestionType = 'pg' | 'pg-kompleks' | 'sesuai-tidak';

export interface Question {
  type: QuestionType;
  question: string;
  options: OptionItem[];
  correct: string | string[] | Record<string, string>;
  explanation: string;
}

export interface Quiz {
  id: number;
  title: string;
  theme: 'teal' | 'orange' | 'brown';
  colorCode: string;
  lightColor: string;
  textTitle: string;
  textBody: string[];
  questions: Question[];
}

export const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Makna Kata, Objek, dan Latar",
    theme: "teal",
    colorCode: "rg-teal",
    lightColor: "rg-cyan",
    textTitle: "Petualangan di Laboratorium Sekolah",
    textBody: [
      "Dina berdiri di depan meja percobaan dengan mata penuh semangat. Hari ini, guru kimia akan mengajarkan tentang proses kristalisasi garam dapur. Sebagai ketua kelompok, Dina bertanggung jawab memastikan semua alat dan bahan telah disiapkan dengan benar.",
      "\"Pertama-tama, kita perlu menyiapkan larutan jenuh,\" kata Pak Ahmad sambil menunjuk ke beberapa gelas kimia di atas meja. \"Kalian harus menggunakan neraca analitik untuk menimbang garam dengan tepat.\" Dina mencatat setiap langkah dengan teliti di buku catatannya.",
      "Di sebelah meja percobaan, terdapat berbagai peralatan laboratorium: pipet tetes, tabung reaksi, kaca pembesar, dan termometer digital. Dina memastikan semua alat dalam kondisi bersih sebelum digunakan. Ia tahu betul bahwa kebersihan alat akan mempengaruhi akurasi hasil percobaan.",
      "\"Sekarang kita akan melakukan proses penguapan menggunakan pembakar bunsen,\" lanjut Pak Ahmad. \"Perhatikan suhu larutan dengan saksama. Jika suhu terlalu tinggi, kristal yang terbentuk tidak akan sempurna.\" Dina mengatur api pembakar dengan hati-hati, memastikan nyala apinya stabil.",
      "Selama proses percobaan berlangsung, Dina mengamati perubahan yang terjadi. Larutan yang semula jernih perlahan mulai keruh. Endapan putih mulai mengendap di dasar gelas kimia. \"Ini adalah proses pengendapan,\" gumam Dina sambil mencatat pengamatannya.",
      "Setelah dua jam percobaan, kristal garam terbentuk dengan sempurna. Bentuknya teratur dan berwarna putih bersih. Dina menggunakan spatula untuk mengambil kristal tersebut dan meletakkannya di atas kaca objek untuk diamati lebih detail.",
      "\"Percobaan hari ini sangat berhasil,\" kata Dina pada teman-temannya. \"Kita berhasil membuktikan teori kristalisasi yang dipelajari di kelas.\" Ia merasa bangga karena kelompoknya berhasil mendapatkan hasil terbaik di antara kelompok lain.",
      "Dina membersihkan semua peralatan dengan cermat. Ia membilas setiap alat dengan akuades dan mengeringkannya sebelum disimpan kembali. Sikap disiplin ini membuat Pak Ahmad sering memuji Dina sebagai murid teladan dalam praktikum."
    ],
    questions: [
      {
        type: "pg",
        question: "Istilah kristalisasi dalam teks merujuk pada....",
        options: [
          { id: "A", text: "proses pembentukan kristal dari larutan melalui penguapan" },
          { id: "B", text: "teknik pengamatan bentuk kristal menggunakan kaca pembesar" },
          { id: "C", text: "cara menimbang bahan kimia dengan neraca analitik" },
          { id: "D", text: "metode pembersihan alat laboratorium dengan akuades" }
        ],
        correct: "A",
        explanation: "Dalam teks, disebutkan bahwa percobaan dimulai dengan membuat \"larutan jenuh\" garam, kemudian dilakukan \"proses penguapan menggunakan pembakar bunsen\", dan akhirnya terbentuk \"kristal garam\" yang sempurna. Urutan proses ini menunjukkan bahwa kristalisasi adalah proses pembentukan kristal dari larutan melalui penguapan pelarut."
      },
      {
        type: "pg",
        question: "Objek yang menunjukkan ketelitian Dina dalam melakukan percobaan adalah....",
        options: [
          { id: "A", text: "gelas kimia dan tabung reaksi" },
          { id: "B", text: "neraca analitik dan termometer digital" },
          { id: "C", text: "pipet tetes dan pembakar bunsen" },
          { id: "D", text: "kaca objek dan spatula" }
        ],
        correct: "B",
        explanation: "Neraca analitik digunakan untuk \"menimbang garam dengan tepat\" yang menunjukkan ketelitian dalam pengukuran massa. Termometer digital digunakan untuk \"memperhatikan suhu larutan dengan saksama\" yang menunjukkan ketelitian dalam pengukuran suhu. Kedua alat ini secara eksplisit dikaitkan dengan tindakan teliti dalam teks."
      },
      {
        type: "pg",
        question: "Latar tempat dalam teks dapat diidentifikasi dengan tepat melalui kosakata....",
        options: [
          { id: "A", text: "\"meja percobaan\" dan \"peralatan laboratorium\"" },
          { id: "B", text: "\"gelas kimia di atas meja\" dan \"pembakar bunsen\"" },
          { id: "C", text: "\"buku catatan\" dan \"kaca pembesar\"" },
          { id: "D", text: "\"larutan jenuh\" dan \"kristal garam\"" }
        ],
        correct: "A",
        explanation: "\"Meja percobaan\" menunjukkan area kerja khusus dalam laboratorium, sedangkan \"peralatan laboratorium\" secara eksplisit menunjukkan bahwa kegiatan berlangsung di laboratorium. Kedua frasa ini secara langsung mengarah pada identifikasi latar tempat."
      },
      {
        type: "pg",
        question: "Berdasarkan konteks penggunaannya dalam teks, istilah \"akurasi\" memiliki makna yang paling tepat dalam bidang penelitian ilmiah adalah ....",
        options: [
          { id: "A", text: "kecepatan dalam melakukan percobaan kimia" },
          { id: "B", text: "ketepatan dan kebenaran hasil pengukuran" },
          { id: "C", text: "kemampuan mengamati perubahan dengan detail" },
          { id: "D", text: "keterampilan menggunakan alat laboratorium" }
        ],
        correct: "B",
        explanation: "Dalam konteks penelitian ilmiah, akurasi merujuk pada seberapa dekat hasil pengukuran dengan nilai sebenarnya. Kebersihan alat yang mempengaruhi \"akurasi hasil percobaan\" menunjukkan bahwa akurasi berkaitan dengan ketepatan dan kebenaran data yang diperoleh."
      },
      {
        type: "pg",
        question: "Objek yang menunjukkan tahapan sistematis dalam metode ilmiah dapat diidentifikasi melalui analisis kosakata yang menggambarkan ....",
        options: [
          { id: "A", text: "alat pengukuran yang digunakan secara berurutan" },
          { id: "B", text: "bahan kimia yang dicampurkan dalam proses tertentu" },
          { id: "C", text: "dokumentasi dan pencatatan setiap langkah percobaan" },
          { id: "D", text: "pembersihan dan perawatan peralatan laboratorium" }
        ],
        correct: "C",
        explanation: "Buku catatan dan kegiatan mencatat yang dilakukan Dina menunjukkan tahapan sistematis dalam metode ilmiah, yaitu dokumentasi yang memungkinkan percobaan dapat direplikasi dan diverifikasi."
      }
    ]
  },
  {
    id: 2,
    title: "Informasi Penting Tersurat",
    theme: "orange",
    colorCode: "rg-orange",
    lightColor: "rg-peach",
    textTitle: "Hadiah Ulang Tahun untuk Nenek",
    textBody: [
      "Rani termenung di kamarnya sambil membolak-balik kalender. Besok adalah hari ulang tahun neneknya yang ke-75. Setiap tahun, Rani selalu memberikan hadiah istimewa untuk orang yang paling disayanginya itu. Tahun lalu, ia memberikan selendang rajut buatan tangannya sendiri. Tahun sebelumnya, Rani menyulam sarung bantal dengan motif bunga kesukaan nenek.",
      "Kali ini, Rani bingung. Ia sudah menabung selama tiga bulan dan berhasil mengumpulkan uang sebesar dua ratus ribu rupiah. Uang itu sebenarnya cukup untuk membeli perhiasan sederhana atau tas kecil yang bagus. Namun, Rani merasa hadiah yang dibeli dengan uang tidak akan bermakna seperti hadiah buatan tangannya.",
      "Tiba-tiba, Rani teringat percakapannya dengan nenek minggu lalu. Nenek bercerita bahwa ia sangat rindu dengan kampung halamannya di Yogyakarta. Nenek lahir dan besar di sana, tetapi sudah tiga puluh tahun tidak pernah pulang karena jarak yang jauh dan biaya perjalanan yang mahal. Nenek sering bercerita tentang gudeg Bu Lies yang sangat lezat, batik Malioboro yang indah, dan suasana Keraton yang megah.",
      "Mata Rani berbinar. Ia punya ide cemerlang! Meskipun tidak bisa mengajak nenek pulang ke Yogyakarta, Rani bisa membawa Yogyakarta ke rumah mereka. Ia akan memasak gudeg sendiri dengan resep yang pernah diajarkan nenek. Rani juga akan membuat album foto berisi gambar-gambar tempat bersejarah di Yogyakarta yang ia unduh dari internet. Sebagai pelengkap, ia akan menghias ruang tamu dengan ornamen khas Jogja.",
      "Rani yakin hadiah buatannya kali ini akan membuat nenek bahagia sekaligus bernostalgia dengan masa mudanya di Yogyakarta."
    ],
    questions: [
      {
        type: "pg",
        question: "Berapa lama Rani menabung untuk mengumpulkan uang hadiah ulang tahun neneknya?",
        options: [
          { id: "A", text: "Dua bulan" },
          { id: "B", text: "Tiga bulan" },
          { id: "C", text: "Empat bulan" },
          { id: "D", text: "Enam bulan" }
        ],
        correct: "B",
        explanation: "Informasi tersebut terdapat pada paragraf kedua kalimat kedua: \"Ia sudah menabung selama tiga bulan dan berhasil mengumpulkan uang sebesar dua ratus ribu rupiah.\""
      },
      {
        type: "pg-kompleks",
        question: "Hadiah apa saja yang pernah diberikan Rani kepada neneknya pada tahun-tahun sebelumnya? Pilihlah jawaban yang benar! Jawaban benar lebih dari satu.",
        options: [
          { id: "A", text: "Selendang rajut buatan tangan" },
          { id: "B", text: "Sarung bantal dengan motif bunga" },
          { id: "C", text: "Album foto tempat bersejarah" },
          { id: "D", text: "Perhiasan sederhana" }
        ],
        correct: ["A", "B"],
        explanation: "Pernyataan 1 dan 2 benar karena disebutkan eksplisit di paragraf pertama: \"Tahun lalu, ia memberikan selendang rajut... Tahun sebelumnya, Rani menyulam sarung bantal...\". Album foto adalah rencana tahun ini, dan perhiasan hanya pertimbangan."
      },
      {
        type: "pg",
        question: "Mengapa nenek tidak pernah pulang ke kampung halamannya selama tiga puluh tahun?",
        options: [
          { id: "A", text: "Karena sudah tidak memiliki keluarga di Yogyakarta" },
          { id: "B", text: "Karena jarak yang jauh dan biaya perjalanan yang mahal" },
          { id: "C", text: "Karena kondisi kesehatannya tidak memungkinkan" },
          { id: "D", text: "Karena tidak ingin meninggalkan Rani sendirian" }
        ],
        correct: "B",
        explanation: "Informasi ini terdapat pada paragraf ketiga: \"Nenek lahir dan besar di sana, tetapi sudah tiga puluh tahun tidak pernah pulang karena jarak yang jauh dan biaya perjalanan yang mahal.\""
      },
      {
        type: "sesuai-tidak",
        question: "Tentukan Sesuai atau Tidak Sesuai untuk setiap pernyataan berikut berdasarkan informasi yang tersurat dalam teks!",
        options: [
          { id: "S1", text: "Rani memiliki uang tabungan sebesar dua ratus ribu rupiah." },
          { id: "S2", text: "Nenek berusia 75 tahun pada ulang tahunnya yang akan datang." },
          { id: "S3", text: "Gudeg Bu Lies adalah makanan yang dirindukan nenek." },
          { id: "S4", text: "Rani berencana mengajak nenek berlibur ke Yogyakarta." }
        ],
        correct: { "S1": "Sesuai", "S2": "Sesuai", "S3": "Sesuai", "S4": "Tidak Sesuai" },
        explanation: "S1 Sesuai (tersurat di paragraf 2). S2 Sesuai (tersurat di paragraf 1). S3 Sesuai (tersurat di paragraf 3). S4 Tidak Sesuai (Teks menyatakan sebaliknya: \"Meskipun tidak bisa mengajak nenek pulang ke Yogyakarta, Rani bisa membawa Yogyakarta ke rumah mereka\")."
      },
      {
        type: "pg",
        question: "Berdasarkan teks, apa saja rencana konkret Rani untuk hadiah ulang tahun neneknya tahun ini?",
        options: [
          { id: "A", text: "Memasak gudeg, membuat album foto, dan menghias ruang tamu dengan ornamen khas Yogyakarta" },
          { id: "B", text: "Membeli perhiasan sederhana, tas kecil, dan makanan khas Yogyakarta" },
          { id: "C", text: "Membuat selendang rajut, album foto, dan ornamen khas Yogyakarta" },
          { id: "D", text: "Memasak gudeg, mengajak nenek ke Yogyakarta, dan membeli batik Malioboro" }
        ],
        correct: "A",
        explanation: "Rencana konkret Rani tersurat dalam paragraf keempat: \"Ia akan memasak gudeg sendiri... membuat album foto... menghias ruang tamu dengan ornamen khas Jogja.\""
      }
    ]
  },
  {
    id: 3,
    title: "Kerangka dan Bagan Informasi",
    theme: "brown",
    colorCode: "rg-brown",
    lightColor: "rg-lightorange",
    textTitle: "Kisah Rasa Kebersamaan di Kampung Mawar",
    textBody: [
      "Kampung Mawar terkenal dengan kerukunan warganya. Setiap pagi, Pak Rahman selalu menyapa tetangganya dengan ramah sambil menyiram tanaman di halaman rumahnya. Bu Sari, tetangga sebelah, tak pernah lupa membalas sapaan sambil menjemur pakaian. Kebiasaan sederhana ini menciptakan suasana hangat yang membuat siapa pun betah tinggal di kampung tersebut.",
      "Namun, keharmonisan ini pernah terganggu ketika keluarga Pak Joko pindah ke Kampung Mawar. Pak Joko adalah orang yang pendiam dan jarang berinteraksi dengan tetangga. Ia lebih suka menghabiskan waktu di dalam rumah bersama keluarganya. Sikap ini membuat beberapa warga merasa Pak Joko sombong dan tidak peduli dengan lingkungan sekitar.",
      "Kesalahpahaman semakin memuncak ketika terjadi masalah sampah di depan rumah Pak Joko. Warga menuduh keluarga baru itu tidak menjaga kebersihan lingkungan. Tanpa bertanya langsung, beberapa tetangga mulai membicarakan Pak Joko dengan nada tidak menyenangkan. Suasana kampung yang dulunya harmonis berubah menjadi tegang dan tidak nyaman.",
      "Untunglah, Bu Ratna, ketua RT yang bijaksana, segera mengambil tindakan. Ia mengundang semua warga untuk berkumpul di balai kampung guna membahas masalah tersebut secara terbuka. Dalam pertemuan itu, Bu Ratna mengajak semua pihak untuk saling mendengarkan dan memahami sudut pandang masing-masing.",
      "Ternyata, Pak Joko menjelaskan bahwa ia memang pendiam karena masih beradaptasi dengan lingkungan baru. Ia juga merasa malu karena belum menguasai dialek setempat dengan baik. Mengenai masalah sampah, Pak Joko mengakui bahwa ia belum memahami aturan pembuangan sampah di kampung tersebut. Setelah mendengar penjelasan ini, warga mulai memahami situasi sebenarnya.",
      "Bu Ratna kemudian mengusulkan solusi yang konstruktif. Ia membentuk kelompok kecil yang bertugas membantu keluarga baru beradaptasi dengan kehidupan di Kampung Mawar. Kelompok ini terdiri dari beberapa warga yang sukarela membantu memberikan informasi tentang aturan-aturan kampung dan tradisi setempat.",
      "Hasilnya luar biasa. Pak Joko dan keluarganya merasa lebih diterima dan mulai aktif berpartisipasi dalam kegiatan kampung. Warga lain juga belajar untuk tidak terburu-buru menghakimi orang baru tanpa memahami kondisi mereka terlebih dahulu. Kampung Mawar kembali menjadi tempat yang harmonis, bahkan lebih kuat dari sebelumnya karena telah melalui ujian kebersamaan yang sesungguhnya."
    ],
    questions: [
      {
        type: "pg",
        question: "Bagan manakah yang paling tepat untuk menggambarkan alur peristiwa dalam teks tersebut?",
        options: [
          { id: "A", text: "Kedatangan Pak Joko → Kesalahpahaman warga → Intervensi Bu Ratna → Penyelesaian masalah → Keharmonisan kembali" },
          { id: "B", text: "Kerukunan kampung → Masalah sampah → Tuduhan warga → Pertemuan warga → Adaptasi Pak Joko" },
          { id: "C", text: "Keharmonisan awal → Kedatangan pendatang → Konflik berkembang → Mediasi pemimpin → Resolusi positif" },
          { id: "D", text: "Pak Joko pindah → Warga curiga → Bu Ratna bertindak → Pak Joko menjelaskan → Masalah selesai" }
        ],
        correct: "C",
        explanation: "Bagan C paling komprehensif dan logis karena menangkap seluruh dinamika cerita mulai dari kondisi awal yang harmonis, gangguan yang muncul, eskalasi konflik, upaya penyelesaian, hingga hasil akhir yang positif menggunakan terminologi yang tepat."
      },
      {
        type: "pg-kompleks",
        question: "Unsur-unsur manakah yang menjadi bagian penting dalam struktur konflik cerita tersebut? Pilihlah jawaban yang benar! Jawaban benar lebih dari satu.",
        options: [
          { id: "A", text: "Sifat pendiam Pak Joko yang disalahartikan warga" },
          { id: "B", text: "Kebiasaan menyapa yang dilakukan Pak Rahman setiap pagi" },
          { id: "C", text: "Masalah sampah yang memicu kesalahpahaman" },
          { id: "D", text: "Ketidakmampuan Pak Joko menguasai dialek setempat" },
          { id: "E", text: "Pembentukan kelompok adaptasi oleh Bu Ratna" }
        ],
        correct: ["A", "C", "D"],
        explanation: "Sifat pendiam (A), masalah sampah (C), dan ketidakmampuan dialek (D) adalah pemicu dan akar dari konflik. Kebiasaan menyapa (B) adalah latar belakang keharmonisan. Pembentukan kelompok adaptasi (E) adalah bagian resolusi, bukan struktur konflik."
      },
      {
        type: "pg",
        question: "Jika teks tersebut disusun dalam bentuk bagan hierarki masalah dan solusi, manakah struktur yang paling logis?",
        options: [
          { id: "A", text: "Masalah utama: Ketidakharmonisan → Penyebab: Sikap Pak Joko → Solusi: Pertemuan warga → Hasil: Kerukunan" },
          { id: "B", text: "Akar masalah: Kurang komunikasi → Pemicu: Kesalahpahaman → Mediator: Bu Ratna → Solusi: Kelompok adaptasi → Outcome: Integrasi" },
          { id: "C", text: "Konflik: Warga vs Pak Joko → Eskalasi: Tuduhan → Intervensi: RT → Klarifikasi: Penjelasan → Rekonsiliasi: Penerimaan" },
          { id: "D", text: "Problem: Adaptasi pendatang → Faktor: Perbedaan budaya → Proses: Dialog terbuka → Implementasi: Pendampingan → Evaluasi: Harmoni" }
        ],
        correct: "B",
        explanation: "Struktur B paling komprehensif dan seimbang karena mengidentifikasi akar masalah yang fundamental (kurangnya komunikasi), pemicu, peran mediator, solusi konkret, dan outcome jangka panjang (integrasi)."
      },
      {
        type: "sesuai-tidak",
        question: "Perhatikan bagan peran tokoh dalam penyelesaian konflik berikut! Tentukan Sesuai atau Tidak Sesuai untuk setiap pernyataan berdasarkan teks!",
        options: [
          { id: "T1", text: "Bu Ratna: Mediator yang mengorganisir pertemuan warga" },
          { id: "T2", text: "Pak Joko: Pihak yang memberikan klarifikasi dan penjelasan" },
          { id: "T3", text: "Kelompok Adaptasi: Kelompok yang belajar tidak menghakimi terburu-buru" },
          { id: "T4", text: "Pak Rahman: Tokoh yang memulai proses rekonsiliasi dengan sapaan" }
        ],
        correct: { "T1": "Sesuai", "T2": "Sesuai", "T3": "Sesuai", "T4": "Tidak Sesuai" },
        explanation: "T1 Sesuai (mengundang warga). T2 Sesuai (memberi penjelasan). T3 Sesuai (teks menyatakan warga belajar tidak menghakimi). T4 Tidak Sesuai (sapaan Pak Rahman terjadi di awal sebelum konflik, bukan untuk rekonsiliasi)."
      },
      {
        type: "pg",
        question: "Manakah bagan yang menunjukkan pola transformasi sosial dalam cerita tersebut dengan tepat?",
        options: [
          { id: "A", text: "Kestabilan → Gangguan → Kekacauan → Campur Tangan → Keseimbangan Baru" },
          { id: "B", text: "Harmoni → Gangguan → Ketegangan → Mediasi → Resolusi → Harmoni" },
          { id: "C", text: "Keseimbangan → Tantangan → Krisis → Solusi → Kembali Normal" },
          { id: "D", text: "Kedamaian → Masalah → Konflik → Penyelesaian → Pelajaran" }
        ],
        correct: "B",
        explanation: "Pola B paling akurat karena menangkap nuansa penting bahwa hasil akhir bukan sekadar kembali ke kondisi semula, tetapi mencapai level harmoni yang lebih kuat karena telah melalui ujian kebersamaan."
      }
    ]
  }
];
