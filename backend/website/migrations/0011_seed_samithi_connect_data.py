"""Data migration: seed the initial 2026 Samithi Connect text reflections.

Running `python manage.py migrate` now populates the initial data automatically.
Further content should be managed through the admin portal.
"""

from django.db import migrations


INITIAL_REFLECTIONS = [
    {
        'roll_number': 'MP26-M201',
        'name': 'Shivam Kumar Sahu',
        'reflection': 'Since Day 1, I have been regularly attending the Navratri Special Nagar Sankirtan and Omkar chanting (21 times) and Suprabhatam, which help me begin my day with the remembrance of God. This practice has brought a positive change in my routine. I have started waking up early, whereas earlier I used to wake up very late, and my entire day would get delayed. I will continue to follow this routine.',
    },
    {
        'roll_number': 'HR26-F101',
        'name': 'Deepanshi Chhillar',
        'reflection': 'Doing Narayan Seva touched my heart deeply. The joy I felt while serving others was beyond words; it felt like my soul was at peace. In their smiles, I felt Swami\u2019s presence, and that feeling will stay with me forever.',
    },
    {
        'roll_number': 'OD26-F204',
        'name': 'Sanjukta Patra',
        'reflection': '\u0906\u091c \u0906\u0930\u093e\u0927\u0928\u093e \u0926\u093f\u0935\u0938 \u0915\u0947 \u092a\u093e\u0935\u0928 \u0905\u0935\u0938\u0930 \u092a\u0930 \u0939\u092e\u093e\u0930\u0947 \u0938\u092e\u093f\u0924\u093f \u092e\u0947\u0902 \u092c\u093e\u0932 \u0935\u093f\u0915\u093e\u0938 \u092c\u091a\u094d\u091a\u094b\u0902 \u0915\u0947 \u0926\u094d\u0935\u093e\u0930\u093e \u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915 \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e \u0906\u092f\u094b\u091c\u093f\u0924 \u0915\u093f\u092f\u093e \u0917\u092f\u093e \u0925\u093e \u0914\u0930 \u0938\u093e\u0925 \u0939\u0940 \u092c\u091a\u094d\u091a\u094b\u0902 \u0928\u0947 Bhajan & Veda \u092d\u0940 \u0915\u093f\u092f\u093e\u0964 \u0907\u0938 \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e \u092e\u0947\u0902 \u092e\u0941\u091d\u0947 \u0936\u093e\u092e\u093f\u0932 \u0939\u094b \u0915\u0930 \u092c\u0939\u0941\u0924 \u0905\u091a\u094d\u091b\u093e \u0932\u0917\u093e\u0964 \u092e\u0948\u0902\u0928\u0947 \u0907\u0938 \u0926\u093f\u0935\u0938 \u092e\u0947\u0902 \u092a\u0939\u0932\u0947 \u0915\u092d\u0940 \u092d\u093e\u0917 \u0928\u0939\u0940\u0902 \u0932\u093f\u092f\u093e \u0925\u093e, \u0914\u0930 \u092a\u0939\u0932\u0940 \u092c\u093e\u0930 \u0907\u0938\u092e\u0947\u0902 \u092d\u093e\u0917 \u0932\u0947\u0915\u0930 \u092e\u0941\u091d\u0947 \u0905\u0924\u094d\u092f\u0902\u0924 \u0938\u0941\u0916\u0926 \u0905\u0928\u0941\u092d\u0942\u0924\u093f \u0939\u0941\u0908\u0964',
    },
    {
        'roll_number': 'OD26-F106',
        'name': 'Shivani Singh',
        'reflection': 'I attended the samithi bhajans today. This experience helped me feel more connected to the values of the Sri Sathya Sai Seva Organisations. I feel inspired to be more regular and involved.',
    },
    {
        'roll_number': 'BH26-F203',
        'name': 'Sweta Supriya',
        'reflection': '\u092d\u091c\u0928 \u092e\u0947\u0902 \u0936\u093e\u092e\u093f\u0932 \u0939\u094b\u0915\u0930 \u092c\u0939\u0941\u0924 \u0905\u091a\u094d\u091b\u093e \u0905\u0928\u0941\u092d\u0935 \u0939\u0941\u0906\u0964 \u092d\u091c\u0928 \u0915\u0947 \u092e\u093e\u0927\u094d\u092f\u092e \u0938\u0947 \u092e\u0928 \u0915\u094b \u0936\u093e\u0902\u0924\u093f \u0914\u0930 \u0938\u0941\u0915\u0942\u0928 \u092e\u093f\u0932\u093e\u0964 \u0907\u0938 \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e \u0928\u0947 \u092e\u0941\u091d\u0947 \u0905\u0902\u0926\u0930 \u0938\u0947 \u0916\u0941\u0936\u0940 \u0914\u0930 \u0928\u0908 \u090a\u0930\u094d\u091c\u093e \u0938\u0947 \u092d\u0930 \u0926\u093f\u092f\u093e\u0964',
    },
    {
        'roll_number': 'TG26-M105',
        'name': 'Mandava Vasu',
        'reflection': 'Today I went to a primary school to help with the breakfast service. Seeing the children was a wonderful experience. The kids came with innocent hearts and pure smiles on their faces. Their happiness while receiving and enjoying the breakfast was very special. Some of them smiled shyly, some said \u201cthank you,\u201d and some simply looked happy to eat together with their friends. Their innocence and genuine joy reminded me how simple things can bring real happiness. Watching them enjoy their breakfast filled my heart with warmth and gratitude.',
    },
    {
        'roll_number': 'KS26-F111',
        'name': 'Sai Priyanka Athmanathan',
        'reflection': 'It was the roughest week ever. Today my intention to come to our samithi is to meet Swami and pray. Swami allowed me to offer Jagadambe Devi Bhavani, which I had promised to offer to Him while sitting in Sai Kulwant Hall a month ago. I didn\u2019t know if I could sing it without crying. But Swami blessed with the strength to offer it to Him the way I promised, and suddenly all the sadness and fear are gone. He has renewed me with strength to go and face my situations. I want Swami to stay with me through all of it. I want Swami to bless my family. We are all blessed to be His Divine Instruments over generations, and He will never hurt us. His Love is infinite. I pray to Swami to use me as His instrument through everything that happens. This is my offering, observation, reflection, and meditation today.',
    },
    {
        'roll_number': 'AP26-F112',
        'name': 'Natti Deepika',
        'reflection': 'In our samithi, we conduct free coaching every year for EMCET (EAMCET), Polytechnic (POLYCET), and NEET exams. Around 250 students benefit from this program annually, and we feel very happy to support them. This initiative is especially important for students who have the ability but are unable to afford coaching. Through this effort, we aim to help them build a better future. Along with academics, we also encourage students to engage in Seva. We take them to participate in service programs so they develop compassion, discipline, and a sense of responsibility. In addition, we conduct Disaster Management Program as well. I feel truly happy to do this wonderful service.',
    },
    {
        'roll_number': 'KL26-F107',
        'name': 'Diya V V',
        'reflection': 'I conducted a simple meditation session today for young children (around 12 years old) focusing on the basics since they are just beginning. I started with simple guidance on body posture, how to calm the mind, and what to do when thoughts arise. It was a peaceful and calm session. The children were very cooperative; I could clearly see their enthusiasm and willingness to learn. Personally, I could feel how Swami is taking care of our youth and especially these young children.',
    },
    {
        'roll_number': 'W126-F102',
        'name': 'Moumita Sarkar',
        'reflection': 'Today, I visited our Samithi and had the opportunity to perform Narayana Seva for an elderly and underprivileged lady by offering her some grocery items. This experience made me realise when our thoughts are pure and our intentions are sincere, is when the Seva feels rewarding. It also reminded me that Swami is the true Doer, and we are merely His instruments.',
    },
    {
        'roll_number': 'OD26-F203',
        'name': 'Sai Sudha Das',
        'reflection': '\u092e\u0948\u0902\u0928\u0947 \u0907\u0938 \u0938\u092a\u094d\u0924\u093e\u0939 \u0938\u092e\u093f\u0924\u093f \u0915\u0947 \u0938\u093e\u092a\u094d\u0924\u093e\u0939\u093f\u0915 \u092d\u091c\u0928 \u092e\u0947\u0902 \u092d\u093e\u0917 \u0932\u093f\u092f\u093e\u0964 \u0935\u0947\u0926 \u091c\u092a \u0914\u0930 \u092d\u091c\u0928 \u092e\u0947\u0902 \u0936\u093e\u092e\u093f\u0932 \u0939\u094b\u0915\u0930 \u092c\u0939\u0941\u0924 \u0905\u091a\u094d\u091b\u093e \u0905\u0928\u0941\u092d\u0935 \u0939\u0941\u0906\u0964 \u0906\u091c \u0938\u092e\u093f\u0924\u093f \u092e\u0947\u0902 \u0905\u0927\u093f\u0915 \u0938\u0902\u0916\u094d\u092f\u093e \u092e\u0947\u0902 \u092d\u0915\u094d\u0924\u094b\u0902 \u0915\u0940 \u0909\u092a\u0938\u094d\u0925\u093f\u0924\u093f \u0915\u0947 \u0915\u093e\u0930\u0923 \u0935\u093e\u0924\u093e\u0935\u0930\u0923 \u0905\u0924\u094d\u092f\u0902\u0924 \u092a\u094d\u0930\u0947\u0930\u0923\u093e\u0926\u093e\u092f\u0915 \u0914\u0930 \u0906\u0928\u0902\u0926\u092e\u092f \u0925\u093e\u0964 \u0927\u0940\u0930\u0947-\u0927\u0940\u0930\u0947 \u092f\u0939 \u0905\u0928\u0941\u092d\u0935 \u0939\u094b \u0930\u0939\u093e \u0939\u0948 \u0915\u093f \u0938\u093e\u092e\u0942\u0939\u093f\u0915 \u092d\u091c\u0928 \u0914\u0930 \u0935\u0947\u0926 \u091c\u092a \u0915\u093f\u0924\u0928\u0947 \u092e\u0939\u0924\u094d\u0935\u092a\u0942\u0930\u094d\u0923 \u0939\u0948\u0902\u0964',
    },
    {
        'roll_number': 'HP26-F105',
        'name': 'Vaibhav Sharma',
        'reflection': 'Today, along with 2\u20133 devotees from our Samithi, we had the blessed opportunity to serve an injured cow in our village. A few days ago, the cow had unfortunately fallen into a drain and was badly hurt. When we came to know about her condition, we visited her along with our Samithi Convener and offered her some fodder and care. This small act of seva filled my heart with immense peace and happiness. While doing this seva, I deeply felt the teachings of Bhagawan Sri Sathya Sai Baba - \u201cLove All, Serve All\u201d and \u201cHelp Ever, Hurt Never.\u201d Serving a voiceless being with love gave me a deep sense of gratitude and inner satisfaction. It truly felt like a divine opportunity to practice selfless service and express love towards God\u2019s creation. Such moments make us realize that even the smallest act of care can bring comfort to someone suffering, and in return, it purifies our own hearts as well.',
    },
    {
        'roll_number': 'OD26-F103',
        'name': 'Gayatri Subhalaxmi',
        'reflection': 'I had a beautiful experience today that felt like a gentle assurance from Swami that He is always listening, caring, and watching over us. I was on my way to the Sai Samithi for the Thursday Bhajan session when it suddenly started raining heavily. I silently prayed to Swami because I did not want to get wet, especially since singing is important to me and I need to take care of my voice. I called one of my SSSLST batchmates to ask if she was coming to the Samithi. She said she wasn\u2019t and suggested that I return to my room because of the heavy rain. But I prayed to Swami and thought, \u201cOnce I have started coming to You, it is now Your responsibility to take care of me.\u201d When I reached my bus stop, it was still raining. Just then, a stranger approached me and asked where I was going. She happened to be heading in the same direction, shared her umbrella with me, and accompanied me all the way to the Samithi. It felt like a small but beautiful reminder from Swami that He is always there for us in ways we may not expect.',
    },
    {
        'roll_number': 'MW26-F108',
        'name': 'Aiswarya Pooja. S',
        'reflection': 'This week\u2019s SCP experience made me reflect on the effort behind every meal that reaches our table, from sowing the seeds and cultivating the crops to harvesting, transporting, and preparing the food. It helped me appreciate not only the value of food but also the time, labor, and care involved in bringing it to us. However, when we serve food with love and compassion, we begin to understand something even deeper: the value of hunger and the preciousness of every morsel on a person\u2019s plate. There is a unique joy in serving others and witnessing their gratitude. Seeing the happiness in their eyes often brings tears to our own. Today\u2019s service at the Nitya Annadan Seva Kendra was a profound reminder of these truths and brought me closer to Bhagawan.',
    },
    {
        'roll_number': 'TG26-M118',
        'name': 'Velagaleti Prasanth',
        'reflection': 'This week at our Samithi, I noticed a shift in my participation. I was more present and attentive rather than just physically attending. There were moments where I wanted to react or speak impulsively, but I consciously chose to listen and reflect first. This helped me understand others better and contribute more meaningfully when I did speak. I also realized the importance of consistency; small, sincere efforts in participation create a deeper connection with the group. Going forward, I want to continue being more aware, open, and engaged in both listening and sharing.',
    },
    {
        'roll_number': 'TG26-F110',
        'name': 'Nazre Shubhangini',
        'reflection': 'My SCP activity this week is Narayana Seva in Mother\u2019s Nest Old-Age Home. My duties included providing lunch and fruits. Also doing Bhajans, 3 times Hanuman Chalisa followed by Swami\u2019s Mangala Harthi. This was a blissful weekend spent with the old-age home grandmothers.',
    },
    {
        'roll_number': 'ME26-F203',
        'name': 'Srushti Ravishankar Channawar',
        'reflection': '\u0939\u092e\u093e\u0930\u0947 \u092f\u0939\u093e\u0901 \u0915\u093f\u091a\u0928 \u0938\u0947\u0935\u093e \u0939\u094b\u0924\u0940 \u0939\u0948, \u091c\u0939\u093e\u0901 \u092a\u094d\u0930\u0924\u093f\u0926\u093f\u0928 \u092d\u094b\u091c\u0928 \u0924\u0948\u092f\u093e\u0930 \u0915\u093f\u092f\u093e \u091c\u093e\u0924\u093e \u0939\u0948\u0964 \u092f\u0939 \u092d\u094b\u091c\u0928 \u0915\u0948\u0902\u0938\u0930 \u0905\u0938\u094d\u092a\u0924\u093e\u0932 \u092e\u0947\u0902 \u0932\u0947 \u091c\u093e\u092f\u093e \u091c\u093e\u0924\u093e \u0939\u0948, \u091c\u0939\u093e\u0901 \u092a\u094d\u0930\u0924\u093f\u0926\u093f\u0928 \u0928\u093e\u0930\u093e\u092f\u0923 \u0938\u0947\u0935\u093e \u0915\u0940 \u091c\u093e\u0924\u0940 \u0939\u0948\u0964 \u0906\u091c \u092e\u0941\u091d\u0947 \u0915\u093f\u091a\u0928 \u0938\u0947\u0935\u093e \u092e\u0947\u0902 \u0938\u0939\u092d\u093e\u0917\u0940 \u0939\u094b\u0928\u0947 \u0915\u093e \u0905\u0935\u0938\u0930 \u092e\u093f\u0932\u093e, \u091c\u093f\u0938\u0938\u0947 \u092e\u0941\u091d\u0947 \u092c\u0939\u0941\u0924 \u0906\u0928\u0902\u0926 \u0914\u0930 \u0938\u0902\u0924\u094b\u0937 \u0915\u093e \u0905\u0928\u0941\u092d\u0935 \u0939\u0941\u0906\u0964 \u092e\u0948\u0902\u0928\u0947 \u092a\u094d\u0930\u0947\u092e\u092a\u0942\u0930\u094d\u0935\u0915 \u0938\u0947\u0935\u093e \u0915\u0940 \u0914\u0930 \u0907\u0938 \u0938\u0947\u0935\u093e \u0915\u094b \u0938\u094d\u0935\u093e\u092e\u0940 \u0915\u0947 \u091a\u0930\u0923\u094b\u0902 \u092e\u0947\u0902 \u0905\u0930\u094d\u092a\u093f\u0924 \u0915\u093f\u092f\u093e\u0964',
    },
    {
        'roll_number': 'KS26-F103',
        'name': 'Dhanya S',
        'reflection': 'I participated in Nithya Narayana Seva at Kidwai Hospital of Oncology, where I had the opportunity to serve food and help with washing and wiping plates. I am grateful to Swami for this opportunity to serve. Earlier, I was more involved in the Spiritual Wing activities, but now I am also loving engaging in Seva activities like these.',
    },
    {
        'roll_number': 'AP26-M107',
        'name': 'Janardhan',
        'reflection': 'Every Thursday, our Samithi conducts a seva activity at the Government Hospital by distributing milk, bread, and biscuits to poor people, patients, and their attendants who come to the hospital. With the blessings of Bhagawan Sri Sathya Sai Baba, we feel blessed to serve the needy with love and care. Heartfelt thanks to all the Sevadal members participating in this noble service activity.',
    },
    {
        'roll_number': 'AP26-F117',
        'name': 'Sai Sreepriya Seelamanthula',
        'reflection': 'This is my first Samithi connect in this program. Even though I\u2019m very much used to going to Samithi and participate in activities, this time I feel something different and more connected to Swami as I have done Jyothi Meditation, concentrating on Jyothi and Swami\u2019s alter, it reminded me of all the Dhyana Vahini topics and scenarios through which I could be more involved and could feel the true essence of meditation and the peace afterwards. Sairam',
    },
    {
        'roll_number': 'DL26-M101',
        'name': 'Ashutosh Shankar',
        'reflection': 'Om Sri Sai Ram. Today, on 7th March, I did an education session in the slum areas of Yamuna Khadar, Mayur Vihar Phase I, under rural area education initiative of my Samithi. I am doing it regularly and teach students residing in this area with academics and spiritual part.',
    },
    {
        'roll_number': 'KN26-F106',
        'name': 'Savitri Dayanand Mannurakar',
        'reflection': 'I take balvikas classes at my village every week this is what makes me feel graceful. It is really great opportunity to thech the children the values and culture that are thought by Swami. I feel extremely near and connected to Swami during the session. I enjoy and feel blessed by Swami. I always feel the presence of Swami in every Bal Vikas class I wish Swami bless all this children with his love. Sairam',
    },
    {
        'roll_number': 'ME26-F204',
        'name': 'Trupti Rohan Khanorkar',
        'reflection': 'Today I did Narayan Seva for first time and it was a great experience and I was really happy to do it. Thank you SAI for giving such opportunity and nice experience. Thank you, Sai Ram.',
    },
    {
        'roll_number': 'AP26-F103',
        'name': 'Chippagiri Sai Mounavi',
        'reflection': 'Aum Sri Sai Ram. After so many moths I am participating in the Dhyanam activities. I couldn\u2019t come for meditation. But participated in post Dhyanam activities like cleaning Swami\u2019s photo, Shiva Abhishekam, Vedam Parayanam, Ashtottaram chanting, Bhajan singing, followed by Mangala Aarathi. After so many months, I am participating in these activities. Feeling so blessed and hope I will continue and perform these activities regularly. Sairam.',
    },
    {
        'roll_number': 'KS26-M102',
        'name': 'J Vivek Subrahmanyam',
        'reflection': 'I have been active in the samithi from a very long time. But today I have done two new things which I haven\u2019t done before. I did my first ever blood donation and I sang a bhajan for the first time. I was involved in decoration, arrangements and many other activities till today. But today marks my first day of singing bhajan and donation of blood. Our convener wanted me to do something new since I came as an SSSLST student, and that lead to this singing. Felt like sharing. Thank you Swami.',
    },
    {
        'roll_number': 'W226-M102',
        'name': 'Aayush Rai',
        'reflection': 'Sadhana Shibir this Sunday was really insightful with lots of amazing stories of God. I would personally try to follow them as they said Sravanam, Mananam and Nididhaynam. The importance of silent sitting was well explained. I shall also develop a habit of staying quiet now as I feel it\u2019s really important for everyone. Also one amazing talk on the topic of Love for God, Having good company and Fear of sin was so touching and I personally felt I should develop more love for God and have better company which will automatically create a fear of sins, there were more topics discussed but I personally think these were topics are so important that every one should give a thought to the and apply the in their life. Sai Ram.',
    },
    {
        'roll_number': 'KS26-M107',
        'name': 'Sai Swaroop Reddy SJ',
        'reflection': 'Had a peaceful meditation in front of Swami\u2019s photo. I was facing some issues in my personal life I questioned my self during meditation if I am doing anything wrong I got all the answers while I was meditating my mind is so relaxed and calm there is some energy boosting inside me. I never tried doing meditation in mandir. This first experience will be forever memorable',
    },
    {
        'roll_number': 'TG26-F101',
        'name': 'Andhole Moksha',
        'reflection': 'Took craft and awareness class for cancer children in MNJ cancer hospital',
    },
    {
        'roll_number': 'TN26-F103',
        'name': 'Sai Kirthanna SG',
        'reflection': 'Took my first Bal Vikas classes at our samithi with over 20 kids and it was very good to be back to Bal Vikas.',
    },
    {
        'roll_number': 'MM26-M104',
        'name': 'Sameer Verma',
        'reflection': 'Since there were no Seva/Bhajans/Camps being organized this week in our samithi, I decided to perform food Seva by my own self. It was truly a cherish able moment to see these young children smiling after getting these food packets.',
    },
]


def seed_data(apps, schema_editor):
    SamithiConnectText = apps.get_model('website', 'SamithiConnectText')

    for entry in INITIAL_REFLECTIONS:
        SamithiConnectText.objects.update_or_create(
            year=2026,
            roll_number=entry['roll_number'],
            defaults={
                'name': entry['name'],
                'reflection': entry['reflection'],
                'is_active': True,
            },
        )


def unseed_data(apps, schema_editor):
    SamithiConnectText = apps.get_model('website', 'SamithiConnectText')
    roll_numbers = [entry['roll_number'] for entry in INITIAL_REFLECTIONS]
    SamithiConnectText.objects.filter(year=2026, roll_number__in=roll_numbers).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0010_samithiconnecttext'),
    ]

    operations = [
        migrations.RunPython(seed_data, unseed_data),
    ]
