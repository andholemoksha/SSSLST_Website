"""Fix the Dhyana Vahini text reflections seed.

Migration 0012 wrongly seeded the DhyanaVahiniText table with the *Samithi
Connect* reflections (the same 28 texts + 5 "-W2" variants = 37 rows). As a
result, the Dhyana Vahini text-reflections page displayed Samithi Connect
content.

This migration corrects the data:
  1. Clears the incorrectly-seeded 2026 rows from DhyanaVahiniText.
  2. Seeds the genuine 2026 Dhyana Vahini Parayanam reflections.

It only touches DhyanaVahiniText — the SamithiConnectText table (seeded by 0011)
is correct and left untouched. Idempotent: re-running clears + re-seeds the same
rows without duplicating.

Also unifies the two prior migration leaves (0017_merge_20260902_1837 and
0018_seed_netritvam_data) so the graph has a single leaf again.
"""

from django.db import migrations


# Genuine Dhyana Vahini Parayanam / meditation reflections (2026).
DHYANA_REFLECTIONS = [
    {
        'roll_number': 'KS26-F111',
        'name': 'Sai Priyanka Athmanathan',
        'reflection': 'I can handle people with calm and steady mind. This version of me didn\u2019t exist 6 months ago. Dhyana Vahini has become one of those experiences where your life gets a clear \u201cBefore\u201d and \u201cAfter\u201d. I only want to keep up the momentum from here.',
    },
    {
        'roll_number': 'TS26-M105',
        'name': 'Kesav Raj',
        'reflection': 'Reading the Vahini series written by Bhagawan was a long time desire for me. Through this Dhyana Vahini Parayanam my dream has come true.\nI also feel blessed as I was able to develop a blueprint to follow for my life from reading Dhyana Vahini and attending the amazing summary sessions.',
    },
    {
        'roll_number': 'GJ26-M104',
        'name': 'Vedarth Manishkumar Desai',
        'reflection': 'Dhyana Vahini came into my life when I really needed it. I had so many questions and confusions. I now feel more calm while discharging my duties and I am slowly learning not to worry too much about results. There is more peace inside than before. For me Dhyana Vahini is like inner guidance. I am truly thankful for this experience.',
    },
    {
        'roll_number': 'GA26-F101',
        'name': 'Divya Ramesh Manikyala',
        'reflection': 'Dhyana Vahini Parayanam has truly become a beautiful part of my daily routine. Each reading from Dhyana Vahini helped me reflect more deeply on my thoughts, actions and purpose in life. One session that touched me deeply was when the speaker said \u201cDon\u2019t react, just respond\u201d - This line stayed with me. I really liked the session where example from The Mahabharata was shared about how attachment and dependence can lead to suffering. It made me think about how important it is to stay balanced in life.',
    },
    {
        'roll_number': 'OD26-F203',
        'name': 'Sai Sudha Das',
        'reflection': '\u0939\u0930 \u0930\u094b\u091c \u0927\u094d\u092f\u093e\u0928\u093e\u0935\u093e\u0939\u093f\u0928\u0940 \u092a\u0922\u093c\u0924\u0947 \u0938\u092e\u092f \u092c\u093e\u092c\u093e \u0938\u0947 \u092a\u0942\u091b\u0947 \u0939\u0941\u090f \u0915\u093f\u0938\u0940 \u0928 \u0915\u093f\u0938\u0940 \u092a\u094d\u0930\u0936\u094d\u0928 \u0915\u093e \u0909\u0924\u094d\u0924\u0930 \u092e\u093f\u0932 \u0939\u0940 \u091c\u093e\u0924\u093e \u0939\u0948\u0964\n\u092e\u0948\u0902 \u092e\u093e\u0928\u0924\u0940 \u0939\u0942\u0901 \u0915\u093f \u092e\u0948\u0902\u0928\u0947 \u092f\u0939 \u0928\u0939\u0940\u0902 \u092a\u0942\u091b\u093e \u0915\u093f \u092e\u0947\u0930\u0947 \u0938\u093e\u0925 \u0910\u0938\u093e \u0915\u094d\u092f\u094b\u0902 \u0939\u0941\u0906, \u0932\u0947\u0915\u093f\u0928 \u092f\u0939 \u091c\u0930\u0942\u0930 \u0938\u092e\u091d \u092e\u0947\u0902 \u0906\u092f\u093e \u0915\u093f \u0907\u0938\u0915\u0947 \u0939\u094b\u0928\u0947 \u0915\u093e \u0915\u093e\u0930\u0923 \u0915\u094d\u092f\u093e \u0939\u0948 \u0914\u0930 \u0907\u0938\u0938\u0947 \u092e\u0941\u091d\u0947 \u0915\u094d\u092f\u093e \u0938\u0940\u0916 \u092e\u093f\u0932\u0940 \u0939\u0948\u0964\n\u091c\u092c \u092e\u0948\u0902\u0928\u0947 \u0916\u0941\u0926 \u0915\u094b \u092d\u0941\u0932\u093e \u0926\u093f\u092f\u093e \u0925\u093e, \u0939\u093e\u0930 \u092e\u093e\u0928 \u0932\u0940 \u0925\u0940, \u0921\u093f\u092a\u094d\u0930\u0947\u0936\u0928, \u0915\u0928\u094d\u092b\u094d\u092f\u0942\u091c\u0928 \u092e\u0947\u0902 \u0925\u0940, \u0916\u0941\u0926 \u0915\u094b \u0938\u092e\u091d \u0928\u0939\u0940\u0902 \u092a\u093e \u0930\u0939\u0940 \u0925\u0940 \u0914\u0930 \u091b\u094b\u091f\u0940-\u091b\u094b\u091f\u0940 \u092c\u093e\u0924\u094b\u0902 \u092e\u0947\u0902 \u0917\u0941\u0938\u094d\u0938\u093e \u0906\u0924\u093e \u0925\u093e, \u0924\u092c \u092c\u093e\u092c\u093e \u0928\u0947 \u092e\u0947\u0930\u0940 \u091c\u093c\u093f\u0902\u0926\u0917\u0940 \u092e\u0947\u0902 \u090f\u0928\u090f\u0932\u092a\u0940 \u0932\u093e\u092f\u093e \u0914\u0930 \u0909\u0938\u0915\u0947 \u092e\u093e\u0927\u094d\u092f\u092e \u0938\u0947 \u0927\u094d\u092f\u093e\u0928\u093e\u0935\u093e\u0939\u093f\u0928\u0940 \u0938\u0947 \u092e\u0941\u091d\u0947 \u092e\u093f\u0932\u0935\u093e\u092f\u093e\u0964\n\u091c\u093f\u0938\u0928\u0947 \u092e\u0941\u091d\u0947 \u0916\u0941\u0926 \u0915\u094b \u092a\u0939\u091a\u093e\u0928\u0928\u093e, \u0905\u092a\u0928\u0940 \u0935\u0948\u0932\u094d\u092f\u0942 \u0914\u0930 \u0935\u0930\u094d\u0925 \u0938\u092e\u091d\u0928\u093e, \u0916\u0941\u0926 \u0938\u0947 \u092a\u094d\u092f\u093e\u0930 \u0915\u0930\u0928\u093e \u0914\u0930 \u0926\u0942\u0938\u0930\u094b\u0902 \u0915\u094b \u092d\u0940 \u0938\u0947\u0935\u093e \u0915\u0947 \u092e\u093e\u0927\u094d\u092f\u092e \u0938\u0947 \u092a\u094d\u092f\u093e\u0930 \u0926\u0947\u0928\u093e \u0938\u093f\u0916\u093e\u092f\u093e\u0964\n\u092e\u0948\u0902 \u0905\u0902\u0924 \u092e\u0947\u0902 \u090f\u0915 \u092c\u093e\u0924 \u0915\u0939\u0928\u093e \u091a\u093e\u0939\u0942\u0901\u0917\u0940, \u0927\u094d\u092f\u093e\u0928\u093e\u0935\u093e\u0939\u093f\u0928\u0940 \u0915\u093e \u091a\u0948\u092a\u094d\u091f\u0930 \u0924\u094b \u0905\u092d\u0940 \u0936\u0941\u0930\u0942 \u0939\u0941\u0906 \u0939\u0948\u0964',
    },
    {
        'roll_number': 'OD26-M103',
        'name': 'Dr B M Shankar Panda',
        'reflection': 'Studying Dhyana Vahini has been a profound anchor for me. Navigating the constant, high-stress demands of my medical duties and intense exam preparation often leaves my mind racing, but these teachings have completely shifted my perspective. It helped me realize that true meditation isn\u2019t just about sitting quietly; it\u2019s about maintaining a steady, peaceful center right in the middle of external chaos. I\u2019ve learned to cultivate a sense of inner stillness that now grounds my daily interactions with patients and my approach to studying. I understood that I must first lead and transform myself before I can effectively serve others.',
    },
    {
        'roll_number': 'OD26-M201',
        'name': 'Bibhu Prasad Sahu',
        'reflection': '\u0927\u094d\u092f\u093e\u0928 \u0935\u093e\u0939\u093f\u0928\u0940 \u092a\u093e\u0930\u093e\u092f\u0923 \u0936\u0941\u0930\u0942 \u0915\u0930\u0928\u0947 \u0938\u0947 \u0932\u0917\u092d\u0917 \u0921\u0947\u0922\u093c \u092e\u0939\u0940\u0928\u0947 \u092a\u0939\u0932\u0947 \u092e\u0941\u091d\u0947 \u0932\u0917\u0924\u093e \u0925\u093e \u0915\u093f \u092e\u0948\u0902 \u0907\u0938 \u092a\u093e\u0920 \u0915\u094b \u0905\u0902\u0924 \u0924\u0915 \u091c\u093e\u0930\u0940 \u0928\u0939\u0940\u0902 \u0930\u0916 \u092a\u093e\u090a\u0901\u0917\u093e, \u0915\u094d\u092f\u094b\u0902\u0915\u093f \u0909\u0938 \u0938\u092e\u092f \u092e\u0947\u0930\u093e \u092e\u0928 \u092c\u093f\u0932\u094d\u0915\u0941\u0932 \u0938\u094d\u0925\u093f\u0930 \u0928\u0939\u0940\u0902 \u0925\u093e\u0964 \u092e\u0947\u0930\u093e \u092e\u0928 \u0915\u093e\u092e \u0914\u0930 \u092a\u0930\u093f\u0935\u093e\u0930 \u0915\u0940 \u091c\u093f\u092e\u094d\u092e\u0947\u0926\u093e\u0930\u093f\u092f\u094b\u0902 \u092e\u0947\u0902 \u0909\u0932\u091d\u093e \u0939\u0941\u0906 \u0925\u093e\u0964 \u090f\u0915 \u092a\u093f\u0924\u093e \u0939\u094b\u0928\u0947 \u0915\u0947 \u0928\u093e\u0924\u0947 \u0905\u092a\u0928\u0947 \u092c\u091a\u094d\u091a\u0947 \u0915\u0940 \u091c\u093f\u092e\u094d\u092e\u0947\u0926\u093e\u0930\u0940 \u0928\u093f\u092d\u093e\u0928\u093e \u0914\u0930 \u0907\u0928 \u0938\u092c \u091a\u0940\u091c\u094b\u0902 \u0915\u094b \u0938\u093e\u0925-\u0938\u093e\u0925 \u0938\u0902\u092d\u093e\u0932\u0928\u0947 \u092e\u0947\u0902 \u0915\u092d\u0940-\u0915\u092d\u0940 \u0924\u0928\u093e\u0935 \u0915\u093e \u0915\u093e\u0930\u0923 \u092c\u0928 \u091c\u093e\u0924\u093e \u0925\u093e \u0914\u0930 \u091c\u0940\u0935\u0928 \u092c\u094b\u091d \u091c\u0948\u0938\u093e \u0932\u0917\u0928\u0947 \u0932\u0917\u0924\u093e \u0925\u093e\u0964\n\u090f\u0915 \u0920\u0947\u0915\u0947\u0926\u093e\u0930 (Contractor) \u0939\u094b\u0928\u0947 \u0915\u0947 \u0915\u093e\u0930\u0923 \u092e\u0947\u0930\u0947 \u0932\u093f\u090f \u090f\u0915 \u091c\u0917\u0939 \u0936\u093e\u0902\u0924\u093f \u0938\u0947 \u092c\u0948\u0920\u0915\u0930 \u0927\u094d\u092f\u093e\u0928\u092a\u0942\u0930\u094d\u0935\u0915 \u0938\u0924\u094d\u0930 \u092e\u0947\u0902 \u092d\u093e\u0917 \u0932\u0947\u0928\u093e \u092c\u0939\u0941\u0924 \u0915\u0920\u093f\u0928 \u0925\u093e\u0964 \u092b\u093f\u0930 \u092d\u0940 \u092e\u0948\u0902\u0928\u0947 \u0905\u092a\u0928\u0947 \u091c\u0940\u0935\u0928 \u092e\u0947\u0902 \u0938\u0941\u0927\u093e\u0930 \u0914\u0930 \u092a\u094d\u0930\u0917\u0924\u093f \u0915\u0947 \u0932\u093f\u090f \u092f\u0939 \u092a\u094d\u0930\u092f\u093e\u0938 \u0915\u0930\u0928\u0947 \u0915\u093e \u0928\u093f\u0930\u094d\u0923\u092f \u0932\u093f\u092f\u093e\u0964 \u092e\u0948\u0902\u0928\u0947 \u0938\u094d\u0935\u093e\u092e\u0940 \u0938\u0947 \u092a\u094d\u0930\u093e\u0930\u094d\u0925\u0928\u093e \u0915\u0940 \u0915\u093f \u0935\u0947 \u092e\u0941\u091d\u0947 \u0935\u0939 \u0936\u0915\u094d\u0924\u093f \u0926\u0947\u0902 \u091c\u093f\u0938\u0938\u0947 \u092e\u0948\u0902 \u0927\u094d\u092f\u093e\u0928 \u0935\u093e\u0939\u093f\u0928\u0940 \u0915\u0947 \u0938\u092d\u0940 \u0905\u0927\u094d\u092f\u093e\u092f \u092a\u0942\u0930\u0947 \u0915\u0930 \u0938\u0915\u0942\u0901\u0964\n\u0907\u0938 \u0905\u0927\u094d\u092f\u092f\u0928 \u0938\u0947 \u092e\u0941\u091d\u0947 \u092f\u0939 \u0938\u0940\u0916 \u092e\u093f\u0932\u0940 \u0915\u093f \u0928\u093f\u0930\u0902\u0924\u0930\u0924\u093e (Consistency) \u0915\u094d\u092f\u093e \u0939\u094b\u0924\u0940 \u0939\u0948 \u0914\u0930 \u091c\u0940\u0935\u0928 \u092e\u0947\u0902 \u0906\u0927\u094d\u092f\u093e\u0924\u094d\u092e\u093f\u0915, \u092a\u0947\u0936\u0947\u0935\u0930 \u0914\u0930 \u092a\u093e\u0930\u093f\u0935\u093e\u0930\u093f\u0915 \u091c\u0940\u0935\u0928 \u0915\u0947 \u092c\u0940\u091a \u0938\u0902\u0924\u0941\u0932\u0928 \u0915\u0948\u0938\u0947 \u092c\u0928\u093e\u090f \u0930\u0916\u093e \u091c\u093e\u0924\u093e \u0939\u0948\u0964 \u0927\u0940\u0930\u0947-\u0927\u0940\u0930\u0947 \u092e\u0948\u0902\u0928\u0947 \u0915\u0941\u091b \u092e\u093f\u0928\u091f\u094b\u0902 \u0938\u0947 \u0927\u094d\u092f\u093e\u0928 \u0915\u0930\u0928\u093e \u0936\u0941\u0930\u0942 \u0915\u093f\u092f\u093e \u0914\u0930 \u092b\u093f\u0930 \u090f\u0915 \u0918\u0902\u091f\u0947 \u0924\u0915 \u092a\u0939\u0941\u0901\u091a \u0917\u092f\u093e\u0964 \u0907\u0938\u0938\u0947 \u092e\u0941\u091d\u0947 \u0906\u0924\u094d\u092e-\u091a\u093f\u0902\u0924\u0928 \u0915\u0940 \u0936\u0915\u094d\u0924\u093f, \u0905\u092a\u0928\u0947 \u0932\u0915\u094d\u0937\u094d\u092f \u092a\u0930 \u090f\u0915\u093e\u0917\u094d\u0930\u0924\u093e \u0914\u0930 \u092e\u0928 \u0915\u0940 \u0936\u093e\u0902\u0924\u093f \u092e\u093f\u0932\u0940\u0964\n\u0906\u091c \u092e\u0947\u0930\u0947 \u0939\u0943\u0926\u092f \u092e\u0947\u0902 \u092c\u0939\u0941\u0924 \u0936\u093e\u0902\u0924\u093f \u0914\u0930 \u0906\u0928\u0902\u0926 \u0915\u093e \u0905\u0928\u0941\u092d\u0935 \u0939\u094b \u0930\u0939\u093e \u0939\u0948\u0964',
    },
    {
        'roll_number': 'MM26-M103',
        'name': 'Saikrishna Radheshyam Maharana',
        'reflection': 'Dhyana Vahini Parayanam over the past month has been an enriching experience for me. One of the biggest learning for me was realizing how qualities like anger, pride and restlessness can become obstacles in spiritual progress and how cultivating humility and steady practice can help us move forward on the spiritual path. I have always been night owl but now these sessions motivated and inspired me to wake up early and practice jyothi meditation regularly. This shift itself has been a very valuable takeaway for me.',
    },
    {
        'roll_number': 'TG26-F118',
        'name': 'N Krishna Prasad Meghana',
        'reflection': 'With the Dhyana Vahini sessions, I started doing meditation 10 minutes a day consistently. I feel calmer than usual and am a happier person now. Through this journey and consistency I hope to see more changes.',
    },
]


def fix_seed(apps, schema_editor):
    DhyanaVahiniText = apps.get_model('website', 'DhyanaVahiniText')

    # 1. Remove the incorrectly-seeded 2026 rows (they held Samithi content).
    DhyanaVahiniText.objects.filter(year=2026).delete()

    # 2. Seed the genuine Dhyana Vahini reflections.
    for entry in DHYANA_REFLECTIONS:
        DhyanaVahiniText.objects.update_or_create(
            year=2026,
            roll_number=entry['roll_number'],
            defaults={
                'name': entry['name'],
                'reflection': entry['reflection'],
                'is_active': True,
            },
        )


def reverse_fix(apps, schema_editor):
    # Reverse simply removes the corrected rows; the earlier 0012 seed is not
    # restored (it was wrong data).
    DhyanaVahiniText = apps.get_model('website', 'DhyanaVahiniText')
    roll_numbers = [entry['roll_number'] for entry in DHYANA_REFLECTIONS]
    DhyanaVahiniText.objects.filter(year=2026, roll_number__in=roll_numbers).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0017_merge_20260902_1837'),
        ('website', '0018_seed_netritvam_data'),
    ]

    operations = [
        migrations.RunPython(fix_seed, reverse_fix),
    ]
