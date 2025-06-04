export const dummyVideoCourse = [
  {
    segment_id: 1,
    segment_name: "Segmen 1",
    segment_videos: [
      {
        video_id: 11,
        video_name: "Video 1",
        video_url: "https://www.youtube.com/watch?v=video1",
        video_duration: "10:00",
        video_description: "Deskripsi video 1",
      },
      {
        video_id: 12,
        video_name: "Video 2",
        video_url: "https://www.youtube.com/watch?v=video2",
        video_duration: "15:42",
        video_description: "Deskripsi video 2",
      },
      {
        video_id: 13,
        video_name: "Video 3",
        video_url: "https://www.youtube.com/watch?v=video3",
        video_duration: "08:23",
        video_description: "Deskripsi video 3",
      },
    ],
  },
  {
    segment_id: 2,
    segment_name: "Segmen 2",
    segment_videos: [
      {
        video_id: 21,
        video_name: "Video 1",
        video_url: "https://www.youtube.com/watch?v=video1",
        video_duration: "10:00",
        video_description: "Deskripsi video 1",
      },
      {
        video_id: 22,
        video_name: "Video 2",
        video_url: "https://www.youtube.com/watch?v=video2",
        video_duration: "15:42",
        video_description: "Deskripsi video 2",
      },
      {
        video_id: 23,
        video_name: "Video 3",
        video_url: "https://www.youtube.com/watch?v=video3",
        video_duration: "08:23",
        video_description: "Deskripsi video 3",
      },
      {
        video_id: 24,
        video_name: "Video 4",
        video_url: "https://www.youtube.com/watch?v=video4",
        video_duration: "11:08",
        video_description: "Deskripsi video 4",
      },
      {
        video_id: 25,
        video_name: "Video 5",
        video_url: "https://www.youtube.com/watch?v=video5",
        video_duration: "21:11",
        video_description: "Deskripsi video 5",
      },
    ],
  },
  {
    segment_id: 3,
    segment_name: "Segmen 3",
    segment_videos: [
      {
        video_id: 31,
        video_name: "Video 1",
        video_url: "https://www.youtube.com/watch?v=video2",
        video_duration: "10:00",
        video_description: "Deskripsi video 2",
      },
      {
        video_id: 32,
        video_name: "Video 2",
        video_url: "https://www.youtube.com/watch?v=video2",
        video_duration: "15:42",
        video_description: "Deskripsi video 2",
      },
      {
        video_id: 33,
        video_name: "Video 3",
        video_url: "https://www.youtube.com/watch?v=video3",
        video_duration: "08:23",
        video_description: "Deskripsi video 3",
      },
    ],
  },
];

export const dummyTryoutPerUniversity = [
  {
    tryout_id: 1,
    tryout_name: "Tryout Universitas Indonesia",
    tryout_accessed: true,
    tryout_description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    created_at: "2025-05-25T00:00:00.000Z",
  },
  {
    tryout_id: 2,
    tryout_name: "Tryout Universitas Pancasila",
    tryout_accessed: false,
    tryout_description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    created_at: "2025-05-25T00:00:00.000Z",
  },
];

export const dummyListVideo = [
  {
    video_id: 1,
    video_title: "Matematika",
    slug: "matematika",
    created_at: "2025-05-25T00:00:00.000Z",
  },
  {
    video_id: 2,
    video_title: "Bahasa Indonesia",
    slug: "bahasa-indonesia",
    created_at: "2025-05-25T00:00:00.000Z",
  },
];

export const dummyQuiz = [
  {
    quiz_id: 1,
    quiz_name: "Evaluasi Pemahaman Dasar Ilmu Farmasi",
    quiz_accessed: true,
    quiz_description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    created_at: "2025-05-25T00:00:00.000Z",
    total_questions: 50,
  },
  {
    quiz_id: 2,
    quiz_name: "Mengulas Ulang Mekanisme Kerja dan Indikasi Obat",
    quiz_accessed: false,
    quiz_description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    created_at: "2025-05-25T00:00:00.000Z",
    total_questions: 75,
  },
];

export const dummyOfferSubscriptions = [
  {
    id: 1,
    name: "Paket 1 Bulan",
    price: 115000,
    discount: 25,
    features: [
      "Akses 100+ video pembelajaran farmasi",
      "Dapat bonus tryout minimal 1 Univesitas",
      "Ringkasan materi lengkap di setiap video",
      "Tanya pertanyaanmu sepuasnya",
    ],
    highlight: false,
    order_link: "https://github.com",
  },
  {
    id: 2,
    name: "Paket 3 Bulan",
    price: 325000,
    discount: 25,
    features: [
      "Akses 100+ video pembelajaran farmasi",
      "Dapat bonus tryout minimal 1 Univesitas",
      "Ringkasan materi lengkap di setiap video",
      "Tanya pertanyaanmu sepuasnya",
    ],
    highlight: true,
    order_link: "https://github.com",
  },
  {
    id: "paket-6-bulan",
    name: "Paket 6 Bulan",
    price: 625000,
    discount: 25,
    features: [
      "Akses 100+ video pembelajaran farmasi",
      "Dapat bonus tryout minimal 1 Univesitas",
      "Ringkasan materi lengkap di setiap video",
      "Tanya pertanyaanmu sepuasnya",
    ],
    highlight: false,
    order_link: "https://github.com",
  },
];
