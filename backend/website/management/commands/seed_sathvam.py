"""Management command to seed the SathvamVideo table with playlist data."""

from django.core.management.base import BaseCommand

from website.models import SathvamVideo

VIDEOS = [
    # ─── 2020 (12 videos) ───
    {'year': 2020, 'video_id': 'WbzUEb4QFjM', 'title': 'Shri Sairam Iyer - Satsang', 'published_at': '2020-05-10', 'order': 1},
    {'year': 2020, 'video_id': 'NyyZQiao4p0', 'title': 'Shri Tribhuvan Sachdeva - Satsang', 'published_at': '2020-05-09', 'order': 2},
    {'year': 2020, 'video_id': '4YiNpoy7WGY', 'title': 'Dr. T. Ravikumar - Satsang', 'published_at': '2020-06-07', 'order': 3},
    {'year': 2020, 'video_id': 'ln-4qtYFrDg', 'title': 'Smt Kamala Pandya - Satsang', 'published_at': '2020-06-06', 'order': 4},
    {'year': 2020, 'video_id': 'EKF7ZKxQwkY', 'title': 'Mrs Vasundhara Sinha - Leaders and Supermen', 'published_at': '2020-08-29', 'order': 5},
    {'year': 2020, 'video_id': 'Atk4sKmMo5s', 'title': 'Dr Repalle Shiva Praveen Kumar - Satsang', 'published_at': '2020-08-30', 'order': 6},
    {'year': 2020, 'video_id': 'xqTCvd9sXbg', 'title': 'Smt Madhuri Duggirala - Satsang', 'published_at': '2020-09-26', 'order': 7},
    {'year': 2020, 'video_id': 'SqqvNzgDUiE', 'title': 'Dr A V S Ramesh Chandra, IFS - Satsang', 'published_at': '2020-09-27', 'order': 8},
    {'year': 2020, 'video_id': '_E_eqAQn76I', 'title': 'Professor H J Bhagia - Satsang', 'published_at': '2020-10-04', 'order': 9},
    {'year': 2020, 'video_id': '4QVKCOLqRPI', 'title': 'Professor Anil Kumar Kamaraju - Satsang', 'published_at': '2020-10-11', 'order': 10},
    {'year': 2020, 'video_id': '_0IJMwL5Vio', 'title': 'Padma Shri Dr. V. Mohan - Essentials of Good Health', 'published_at': '2020-10-18', 'order': 11},
    {'year': 2020, 'video_id': '0baOUrXImPo', 'title': 'Professor Sudhir Bhaskar - Values Centered Leadership', 'published_at': '2020-11-01', 'order': 12},

    # ─── 2021 (11 videos) ───
    {'year': 2021, 'video_id': 'RG8YVRiIxDA', 'title': 'The Sai who Lends Music - Sai Shravanam', 'published_at': '2021-04-28', 'order': 1},
    {'year': 2021, 'video_id': 'ciClXa_3BEc', 'title': 'Divinely Driven Ambassador - Ambassador Anil Trigunayat', 'published_at': '2021-06-18', 'order': 2},
    {'year': 2021, 'video_id': 'eUlxk0Hw4L8', 'title': 'Goal Oriented Optimistic Guided Leader - Madhuri Duggirala', 'published_at': '2021-06-18', 'order': 3},
    {'year': 2021, 'video_id': 'JlbyjAeQ7OM', 'title': 'Heart 2 Heart - Shri Nimish Pandya, AIP, SSSSO India', 'published_at': '2021-06-18', 'order': 4},
    {'year': 2021, 'video_id': 'yX4LrMD3T8k', 'title': "E-retail that He Re-taled - Sai's Anand, A SaaS Leader", 'published_at': '2021-08-06', 'order': 5},
    {'year': 2021, 'video_id': '8jh--RD_auM', 'title': "God's Servant Truly Customised To Serve The Nation", 'published_at': '2021-08-11', 'order': 6},
    {'year': 2021, 'video_id': 'KQ7ltFgieGk', 'title': 'Divinely Blessed - A Humble Servant of the Lord Sai', 'published_at': '2021-08-11', 'order': 7},
    {'year': 2021, 'video_id': 'EOZNTDy25co', 'title': 'Divinely Nurtured - Guiding Light of Sri Sathya Sai Bal Vikas', 'published_at': '2021-08-31', 'order': 8},
    {'year': 2021, 'video_id': 'V1zgGXqln8U', 'title': "In Almighty's Service - Sri Sanjeev Kumar IAS", 'published_at': '2021-09-17', 'order': 9},
    {'year': 2021, 'video_id': 'Z0zr_JrMC2M', 'title': 'Satsang by Organising Team Members', 'published_at': '2021-11-05', 'order': 10},
    {'year': 2021, 'video_id': '93SfwJAH8Ok', 'title': 'Divinely Chartered - Air Chief Marshal Sri Nirmal Chandra Suri', 'published_at': '2022-03-23', 'order': 11},

    # ─── 2022 (12 videos) ───
    {'year': 2022, 'video_id': 'sV6exFdAhCA', 'title': "Divinely Blessed... In Almighty's Service - Smt A Sridevasena, IAS", 'published_at': '2022-03-23', 'order': 1},
    {'year': 2022, 'video_id': '46XyTy-Dmlw', 'title': 'Goal Oriented Optimistic Guided Leader - Smt. Madhuri Duggirala', 'published_at': '2022-04-03', 'order': 2},
    {'year': 2022, 'video_id': 'i5YpfVuECrs', 'title': 'His Holiness in HIS Service - Swami Sri Atmanandaji Maharaj', 'published_at': '2022-04-18', 'order': 3},
    {'year': 2022, 'video_id': '3N6kEBZOr3c', 'title': 'Learnings of Life with Bhagawan - Sri S S Naganand', 'published_at': '2022-07-23', 'order': 4},
    {'year': 2022, 'video_id': 'asse7wrdDsc', 'title': 'Who is Bhagawan Sri Sathya Sai Baba - Sri VSR Moorty', 'published_at': '2022-07-23', 'order': 5},
    {'year': 2022, 'video_id': 'j-EjTJTooPM', 'title': 'Sri Sathya Sai - The Supreme Leader - Dr V Mohan', 'published_at': '2022-08-16', 'order': 6},
    {'year': 2022, 'video_id': 'ZDkKqCtcuos', 'title': 'WATCH - the Watch Word in Leadership - Prof. Dr Usha K Nair', 'published_at': '2022-08-16', 'order': 7},
    {'year': 2022, 'video_id': 'hQfj3ogfL8g', 'title': 'Sai Bina Raha Na Jaaye - Sri S Ravi Kumar', 'published_at': '2022-10-12', 'order': 8},
    {'year': 2022, 'video_id': 'fm7lrRIM2PE', 'title': 'Sri Sathya Sai - Prana Mithra - Dr Gopi Krishna Pidatala', 'published_at': '2022-10-12', 'order': 9},
    {'year': 2022, 'video_id': 'FlsR-EEGrhM', 'title': "Sai Baba's Mahavakya on Leadership - Sri Shyamal Sur", 'published_at': '2022-10-12', 'order': 10},
    {'year': 2022, 'video_id': 'ldEUHRaO7Kg', 'title': 'In Real Seva to the Nation - Sri Jasthi Krishna Kishore, IRS', 'published_at': '2022-10-14', 'order': 11},
    {'year': 2022, 'video_id': 'VKYFO4I6k1U', 'title': 'SSSNLPST Organizing Team', 'published_at': '2022-10-14', 'order': 12},

    # ─── 2023 (10 videos) ───
    {'year': 2023, 'video_id': 'fhzkPeN0z24', 'title': 'Leading by Being an Example - Sri L V Subrahmanyam, IAS', 'published_at': '2023-04-21', 'order': 1},
    {'year': 2023, 'video_id': 'QzzRDBB1zUo', 'title': 'Inspiring Patriotism, The SAI Way - Sri A K Khan, IPS (Retd.)', 'published_at': '2023-07-13', 'order': 2},
    {'year': 2023, 'video_id': 'Cff3VsjvAlY', 'title': 'AUM - The Primordial Call of The Divine - Dr U S Vishal Rao', 'published_at': '2023-07-13', 'order': 3},
    {'year': 2023, 'video_id': '7iKD5vpqMKk', 'title': "Leadership & Service - Swami's Teachings - Sri Satyadeep Chatterjee", 'published_at': '2023-07-13', 'order': 4},
    {'year': 2023, 'video_id': 'g2x4_xDnWEw', 'title': "Ever In Almighty's Service - Dr M Sai Kumar, IAS", 'published_at': '2023-07-13', 'order': 5},
    {'year': 2023, 'video_id': 'V6tlBt2h6pQ', 'title': 'Heart 2 Heart with All India President', 'published_at': '2023-07-23', 'order': 6},
    {'year': 2023, 'video_id': '5ioOyLjS1YA', 'title': 'Beyond the Algorithm - Smt. Madhuri Duggirala', 'published_at': '2023-07-24', 'order': 7},
    {'year': 2023, 'video_id': 'Jg7wM3L4IwI', 'title': 'Serving his Motherland with Duty & Devotion - Sri Rahul Nangare', 'published_at': '2023-09-10', 'order': 8},
    {'year': 2023, 'video_id': 'ECvwluJ8Bvg', 'title': 'Transformation Comes from Within - SSSNLP Org Team', 'published_at': '2023-09-13', 'order': 9},
    {'year': 2023, 'video_id': 'lZTuJ7ecez0', 'title': 'Classroom of Compassion - Prof. Dr. Yoginder Verma', 'published_at': '2023-09-25', 'order': 10},

    # ─── 2024 (10 videos) ───
    {'year': 2024, 'video_id': 'ybXOGk4onY4', 'title': 'Heartful Seva At Thy Lotus Feet - Dr Manoj Bhimani', 'published_at': '2024-06-22', 'order': 1},
    {'year': 2024, 'video_id': 'pK2AlAzFzTA', 'title': "In Almighty's Seva - Sri Hari Ranjan Rao, IAS", 'published_at': '2024-08-06', 'order': 2},
    {'year': 2024, 'video_id': '95G4H46g_DE', 'title': 'Unity in Thought, Word and Deed - Sri TVSN Prasad, IAS', 'published_at': '2024-08-09', 'order': 3},
    {'year': 2024, 'video_id': 'HBFxX1iJE50', 'title': 'Rising to the Expectations of Sri Sathya Sai - Sri Nagesh G Dhakappa', 'published_at': '2024-10-29', 'order': 4},
    {'year': 2024, 'video_id': 'Hjyd8t1UuJc', 'title': 'Divine Directories - Sri Nimish Pandya', 'published_at': '2024-10-31', 'order': 5},
    {'year': 2024, 'video_id': 'F1EQXKAdkG8', 'title': "Divine Love's Five Fold Path - Sri Vijay Santhanam", 'published_at': '2024-11-05', 'order': 6},
    {'year': 2024, 'video_id': '9hJYwWq6KBM', 'title': 'Sathya Sai Message - Primordial and Universal - Dr U Suma Rao', 'published_at': '2025-03-24', 'order': 7},
    {'year': 2024, 'video_id': '80nM6FLY7DE', 'title': "Swami's Aswath - Dr Aswath Narayan", 'published_at': '2025-03-31', 'order': 8},
    {'year': 2024, 'video_id': 'BKw5wkfDSjI', 'title': 'Life is a Game, Play It - Smt. Madhuri Duggirala', 'published_at': '2025-06-05', 'order': 9},
    {'year': 2024, 'video_id': '_51Pe2SZq0o', 'title': 'Transformation Comes from Within - SSSNLP Org Team (2024)', 'published_at': '2026-04-18', 'order': 10},

    # ─── 2025 (11 videos) ───
    {'year': 2025, 'video_id': 'KWJUbAlVgdE', 'title': 'A Journey of JOY - Prof Dr Rani P L', 'published_at': '2025-03-21', 'order': 1},
    {'year': 2025, 'video_id': 'hAKrn7V-Z0I', 'title': "In Antaryami's Seva - Dr M Sai Kumar, IAS", 'published_at': '2025-04-03', 'order': 2},
    {'year': 2025, 'video_id': 'uATjzex5aUY', 'title': 'Nivedanam: Surrendering to Lead - Smt Deepti Gaur Mukerjee, IAS', 'published_at': '2025-06-08', 'order': 3},
    {'year': 2025, 'video_id': 'PEhg7LvEu0w', 'title': 'Maa Bharat: Where Culture is Born, and Legacy Lives On - Ms Shinjini Kulkarni', 'published_at': '2025-06-08', 'order': 4},
    {'year': 2025, 'video_id': 'rkLmmRtQ9DA', 'title': 'Hrudaya Sarathi - The Inner Divine Compass - Sri Padmanabha Pai', 'published_at': '2025-07-20', 'order': 5},
    {'year': 2025, 'video_id': 'UZUejm4HYPI', 'title': 'Tat Twam Asi - Shri Nimish Pandya, All India President, SSSSO India', 'published_at': '2025-07-24', 'order': 6},
    {'year': 2025, 'video_id': 'pX5rJGxCnNI', 'title': 'OMNIPRESENT - Dr Sanjay Aggarwal, Zonal President, North Zone, SSSSO India', 'published_at': '2025-09-11', 'order': 7},
    {'year': 2025, 'video_id': 'EJnR_m4wbug', 'title': 'Mama Dharma - Hon. Justice Ananya Bandopadhyay', 'published_at': '2025-09-16', 'order': 8},
    {'year': 2025, 'video_id': 'E8EQD4RhYv8', 'title': 'Aradhana through Action - Dr Pallavi Jain Govil, IAS', 'published_at': '2025-09-20', 'order': 9},
    {'year': 2025, 'video_id': 'WsGOFDMeWJk', 'title': 'Valuing Life Through The Values of Sai - Sri Srinivasulu Huggahalli', 'published_at': '2025-09-29', 'order': 10},
    {'year': 2025, 'video_id': 'LRBoQXGggYg', 'title': 'Atmarama - Sri C.V. Sankar, IAS (Retd.)', 'published_at': '2025-11-07', 'order': 11},

    # ─── 2026 (5 videos) ───
    {'year': 2026, 'video_id': 'lm9OumywtKg', 'title': 'Resonating With The Voice Within - Sri Girish Krishnamurthy', 'published_at': '2026-04-24', 'order': 1},
    {'year': 2026, 'video_id': 'xRj42cJdZaQ', 'title': 'ANTARJYOTI - Awakening the Flame Within - Sri Narayan Sethuramon', 'published_at': '2026-05-10', 'order': 2},
    {'year': 2026, 'video_id': 'tZvAmmMg6KI', 'title': 'Vaatsalya: The Grace that Governs - Smt Vandita Sharma, IAS (Retd.)', 'published_at': '2026-06-21', 'order': 3},
    {'year': 2026, 'video_id': 'wH9DDjeD6iY', 'title': 'Arpan: Rann se Charan Tak - Major General Ravi Pal Singh Bhandari (Retd.)', 'published_at': '2026-07-22', 'order': 4},
    {'year': 2026, 'video_id': '8QhxnDQe7EI', 'title': 'Naad - The Unstruck Chord - Sri Narayan Prasad Sar', 'published_at': '2026-08-09', 'order': 5},
]


class Command(BaseCommand):
    help = 'Seed the SathvamVideo table with playlist data for 2020-2026'

    def handle(self, *args, **options):
        created_count = 0
        for video in VIDEOS:
            _, created = SathvamVideo.objects.update_or_create(
                video_id=video['video_id'],
                defaults={
                    'year': video['year'],
                    'title': video['title'],
                    'published_at': video['published_at'],
                    'order': video['order'],
                    'is_active': True,
                },
            )
            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(f'Done. {created_count} new videos created, {len(VIDEOS) - created_count} updated.')
        )
