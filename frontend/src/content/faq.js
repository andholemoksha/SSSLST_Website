// FAQ content for the Frequently Asked Questions page.
//
// Shape:
//   sections: [{ title, items: [{ question, answer }] }]
//
// `answer` can be:
//   - a string (single paragraph)
//   - an array of strings (multiple paragraphs)
//   - an object { intro?, list: [] } to render a lead-in line + bullet list
//
// Section `title` renders as a heading; questions render in the foreground
// (near-black) as accordion triggers.

export const faq = {
  sections: [
    {
      title: "Eligibility & Admission",
      items: [
        {
          question: "Who can apply?",
          answer:
            "Youth aged 21 to 35 years, calculated as on 1 January of the admission year, can apply. Applicants should be comfortable communicating in English or Hindi, have basic computer skills, reliable internet access, and a personal laptop/computer. Applicants are expected to commit fully to the programme, irrespective of personal or professional responsibilities.",
        },
        {
          question: "Is anyone not eligible?",
          answer: "Alumni of SSSIHL or SSSILP are not eligible to apply.",
        },
        {
          question: "When do applications open and close?",
          answer: "Applications open on October 20th of every year.",
        },
        {
          question: "How do I apply?",
          answer:
            "Applications are submitted online through the SSSLST website. Applicants will need a valid email address and mobile number.",
        },
        {
          question: "How can I check my application status?",
          answer:
            "Application status can be checked using the registered mobile number and email address.",
        },
        {
          question: "What do I need before I apply?",
          answer:
            "A personal laptop or computer with uninterrupted internet access is required for the programme.",
        },
      ],
    },
    {
      title: "Programme Structure & Commitment",
      items: [
        {
          question: "What does the programme involve?",
          answer: {
            list: [
              "1 month Dhyana Vahini Parayanam: daily practice of reading and reflection.",
              "39 Weekly Sessions & Satsangs: skill-building sessions and talks by eminent speakers. This constitutes the major part of the programme.",
              "3 month Samithi Connect Programme: weekly participation at the nearest Samithi.",
              "6 month Project: a hands-on service project.",
            ],
          },
        },
        {
          question: "What is the time commitment?",
          answer: {
            list: [
              "Weekend online sessions of 90–120 minutes on Saturdays/Sundays.",
              "A dedicated one-month Dhyana Vahini module.",
              "A 3-month Samithi Connect Programme.",
              "A 6-month Project Management Module.",
              "A 3-day Contact Programme at Prasanthi Nilayam.",
              "A 3-day Graduation Programme at Prasanthi Nilayam.",
            ],
          },
        },
      ],
    },
    {
      title: "Commitment",
      items: [
        {
          question: "What kind of commitment is expected from me?",
          answer:
            "This is a 1-year high intensity leadership programme with spirituality as its base. Every week there would be sessions of 1.5 hours and on some weekends, there could be 2 sessions.",
        },
        {
          question: "Is attendance mandatory?",
          answer:
            "The programme requires a minimum of 80% attendance for certification across sessions and Satsangs.",
        },
        {
          question: "Is the Contact Programme compulsory?",
          answer: "Yes. Attendance at the Contact Programme in person is compulsory.",
        },
        {
          question: "What happens if I miss sessions?",
          answer:
            "Emergency absence is permitted only with prior permission from the Convener. Regular or frequent absence may affect continuation in the programme.",
        },
        {
          question: "Can I drop out of the programme?",
          answer:
            "Participants may withdraw by sending an official email to the Convener and State President. However, participants are encouraged to honour their commitment and complete the programme, as each seat is allotted to another deserving applicant.",
        },
      ],
    },
    {
      title: "Evaluation & Grading",
      items: [
        {
          question: "How is the programme evaluated?",
          answer: {
            list: [
              "Credits are awarded for session attendance, pre-reading, post-session quizzes, Samithi Connect, Dhyana Vahini practice, and in-person attendance at Prasanthi Nilayam.",
              "Projects are evaluated monthly and graded by SSSIHL.",
              "A written examination and viva voce are held towards the close of the programme, after which the certificate is awarded.",
              "Project and Samithi Connect check-ins include uploading photographs to the website, which form part of the evaluation.",
            ],
          },
        },
      ],
    },
    {
      title: "Fees & Materials",
      items: [
        {
          question: "Is there a programme fee?",
          answer:
            "The programme is free. Participants may need to pay for food and accommodation during the in-person Contact and Graduation Programmes.",
        },
        {
          question: "Do I need to purchase books or study material?",
          answer:
            "No. There is no mandatory purchase of books or study material. Required material is shared by the faculty as pre and post-reading. Additional books, articles or videos may be recommended for optional further learning.",
        },
      ],
    },
    {
      title: "Certification & Career",
      items: [
        {
          question: "Will I receive a certificate?",
          answer:
            "Yes. A certificate is awarded on successful completion of the programme, subject to fulfilling the required attendance, credits and evaluation criteria.",
        },
        {
          question: "Can I use the programme in my portfolio or resume?",
          answer:
            "Yes. Participants may include the skills developed, certificate received and project work undertaken as part of their portfolio or resume. The programme does not guarantee placement or employment.",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          question: "Who do I contact for queries?",
          answer:
            "For queries, please write to ssslst.english@ssssoindia.org. Participants may also contact their State President or State Youth Coordinator.",
        },
      ],
    },
  ],
};
