export const users = [{
        "user_id": 5051374,
        "display_name": "Bunga",

        "consistency_score": 80,
        "insight_text": "Kamu berhasil belajar 6 dari 7 hari minggu ini! Konsistensi yang luar biasa, pertahankan momentum ini.",

        "learning_pattern": {
            "name": "Consistent Learner",
            "description": "Kamu tipe belajar yang slow but steady!...",
            "data": [
                { "label": "Consistent Learner", "percentage": 55, "color": "#44dcd0" },
                { "label": "Fast Learner", "percentage": 30, "color": "#0c9bab" },
                { "label": "Reflective Learner", "percentage": 15, "color": "#0d1c31" },
            ]
        },
        "most_active_time": {
            "period": "Evening",
            "period_name": "The Sunset Scholar",
            "description": "Kamu tipe yang perlu warm-up dulu...",
            "data": [
                { "label": "Morning (06:00-11:59)", "fillPercentage": 30 },
                { "label": "Afternoon (12:00-17:59)", "fillPercentage": 50 },
                { "label": "Evening (18:00-23:59)", "fillPercentage": 85 }, // Perhatikan jam malamnya
                { "label": "Late Night (00:00-05:59)", "fillPercentage": 10 } // <<< BARU: Kategori ke-4 ditambahkan
            ],
        },
        "consistency": {
            "category": "High Consistency",
            "description": "Konsistensi kamu kelas expert! Disiplin banget sampai belajar udah kayak bagian dari rutinitas harian kamu."
        },



        // Cara pemanggilan:
        // <ActiveTimeDetailModal isOpen={true} onClose={handleClose} activeTimeData={eveningData} />
    },
    {
        "user_id": 938276,
        "display_name": "nurrizkiadip",
        "learning_pattern": {
            "name": "Fast Learner",
            "description": "Wah, kamu tipe speed learner! Materi baru langsung nyantol di otak. Tapi tetep ya, jangan sampai kecepatan bikin kamu skip kualitas!"
        },
        "most_active_time": {
            "period": "Morning",
            "period_name": "The Early Bird",
            "description": "Kamu di pagi hari tuh kayak HP habis di-charge semalaman. Full battery dan fokus maksimal. Dunia masih sepi, vibe masih calm, dan itu bikin kamu gampang banget nyerap materi."
        },
        "consistency": {
            "category": "Medium Consistency",
            "description": "Cukup konsisten! Kadang ada jeda kecil, tapi overall kamu masih on track. Bisa makin stabil kalau dibantu reminder atau mini-habit."
        }
    },
    {
        "user_id": 5021477,
        "display_name": "rifath_2SXp",
        "learning_pattern": {
            "name": "Consistent Learner",
            "description": "Kamu tipe belajar yang slow but steady! Konsistensi kamu tuh keren banget. Pelan tapi pasti. Setiap langkah kecil tetap punya impact, dan kamu selalu buktiin itu."
        },
        "most_active_time": {
            "period": "Morning",
            "period_name": "The Early Bird",
            "description": "Kamu di pagi hari tuh kayak HP habis di-charge semalaman. Full battery dan fokus maksimal. Dunia masih sepi, vibe masih calm, dan itu bikin kamu gampang banget nyerap materi."
        },
        "consistency": {
            "category": "High Consistency",
            "description": "Konsistensi kamu kelas expert! Disiplin banget sampai belajar udah kayak bagian dari rutinitas harian kamu."
        }
    },
    {
        "user_id": 5044844,
        "display_name": "ledis_idola_h8Ge",
        "learning_pattern": {
            "name": "Consistent Learner",
            "description": "Kamu tipe belajar yang slow but steady! Konsistensi kamu tuh keren banget. Pelan tapi pasti. Setiap langkah kecil tetap punya impact, dan kamu selalu buktiin itu."
        },
        "most_active_time": {
            "period": "Morning",
            "period_name": "The Early Bird",
            "description": "Kamu di pagi hari tuh kayak HP habis di-charge semalaman. Full battery dan fokus maksimal. Dunia masih sepi, vibe masih calm, dan itu bikin kamu gampang banget nyerap materi."
        },
        "consistency": {
            "category": "High Consistency",
            "description": "Konsistensi kamu kelas expert! Disiplin banget sampai belajar udah kayak bagian dari rutinitas harian kamu."
        }
    },
    {
        "user_id": 5051374,
        "display_name": "fkaslana",
        "learning_pattern": {
            "name": "Consistent Learner",
            "description": "Kamu tipe belajar yang slow but steady! Konsistensi kamu tuh keren banget. Pelan tapi pasti. Setiap langkah kecil tetap punya impact, dan kamu selalu buktiin itu."
        },
        "most_active_time": {
            "period": "Evening",
            "period_name": "The Sunset Scholar",
            "description": "Kamu tipe yang perlu warm-up dulu sebelum masuk learning mode. Pas sore ke malam, kamu baru dapet vibe yang pas lebih tenang, lebih fokus, dan akhirnya produktif banget. Evening study hits different buat kamu!"
        },
        "consistency": {
            "category": "High Consistency",
            "description": "Konsistensi kamu kelas expert! Disiplin banget sampai belajar udah kayak bagian dari rutinitas harian kamu."
        }
    },
    {
        "user_id": 5181638,
        "display_name": "anggit_andreansyah",
        "learning_pattern": {
            "name": "Fast Learner",
            "description": "Wah, kamu tipe speed learner! Materi baru langsung nyantol di otak. Tapi tetep ya, jangan sampai kecepatan bikin kamu skip kualitas!"
        },
        "most_active_time": {
            "period": "Morning",
            "period_name": "The Early Bird",
            "description": "Kamu di pagi hari tuh kayak HP habis di-charge semalaman. Full battery dan fokus maksimal. Dunia masih sepi, vibe masih calm, dan itu bikin kamu gampang banget nyerap materi."
        },
        "consistency": {
            "category": "Medium Consistency",
            "description": "Cukup konsisten! Kadang ada jeda kecil, tapi overall kamu masih on track. Bisa makin stabil kalau dibantu reminder atau mini-habit."
        }
    },
    {
        "user_id": 5410562,
        "display_name": "jeni_amanda_ABFC",
        "learning_pattern": {
            "name": "Consistent Learner",
            "description": "Kamu tipe belajar yang slow but steady! Konsistensi kamu tuh keren banget. Pelan tapi pasti. Setiap langkah kecil tetap punya impact, dan kamu selalu buktiin itu."
        },
        "most_active_time": {
            "period": "Morning",
            "period_name": "The Early Bird",
            "description": "Kamu di pagi hari tuh kayak HP habis di-charge semalaman. Full battery dan fokus maksimal. Dunia masih sepi, vibe masih calm, dan itu bikin kamu gampang banget nyerap materi."
        },
        "consistency": {
            "category": "Medium Consistency",
            "description": "Cukup konsisten! Kadang ada jeda kecil, tapi overall kamu masih on track. Bisa makin stabil kalau dibantu reminder atau mini-habit."
        }
    },
    {
        "user_id": 5410865,
        "display_name": "ramadhan_oktarizaldi_02Qj",
        "learning_pattern": {
            "name": "Fast Learner",
            "description": "Wah, kamu tipe speed learner! Materi baru langsung nyantol di otak. Tapi tetep ya, jangan sampai kecepatan bikin kamu skip kualitas!"
        },
        "most_active_time": {
            "period": "Morning",
            "period_name": "The Early Bird",
            "description": "Kamu di pagi hari tuh kayak HP habis di-charge semalaman. Full battery dan fokus maksimal. Dunia masih sepi, vibe masih calm, dan itu bikin kamu gampang banget nyerap materi."
        },
        "consistency": {
            "category": "Medium Consistency",
            "description": "Cukup konsisten! Kadang ada jeda kecil, tapi overall kamu masih on track. Bisa makin stabil kalau dibantu reminder atau mini-habit."
        }
    }
];