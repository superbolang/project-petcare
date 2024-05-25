'use client';

import Image from 'next/image';
import Link from 'next/link';

export const LandingPage = () => {
  const faqs = [
    {
      question: 'How ?',
      answer: 'yes',
    },
    {
      question: 'When ?',
      answer: 'yes',
    },
  ];

  const services = {
    serviceTypes: [
      {
        id: 1,
        title: 'Boarding Accommodations',
        description: 'Secure and comfortable boarding options for pets of all sizes. Whether it’s a spacious suite or a cozy den, your guests will feel right at home',
        image: '/images/Boarding-Accommodations.jpg',
      },
      {
        id: 2,
        title: 'Feeding and Hydration',
        description: 'Prioritize the dietary needs of each pet. Offer high-quality meals and ensure fresh water is always available',
        image: '/images/Feeding-and-Hydration.jpg',
      },
      {
        id: 3,
        title: 'Exercise and Playtime',
        description: 'Regular play sessions and outdoor activities keep pets active and happy. Consider playgroups, walks, and even agility courses',
        image: '/images/Exercise-and-Playtime.jpg',
      },
      {
        title: 'Grooming Services',
        description: 'Pamper pets with baths, brushing, nail trims, and fur styling. A well-groomed pet is a happy pet',
        image: '/images/Grooming-Services.jpg',
      },
    ],
    packages: [
      {
        id: 1,
        name: 'Basic',
        price: 50000,
        includeService: ['Boarding Accommodations', 'Feeding and Hydration'],
      },
      {
        id: 2,
        name: 'Extra',
        price: 750000,
        includeService: ['Boarding Accommodations', 'Feeding and Hydration', 'Exercise and Playtime'],
      },
      {
        id: 3,
        name: 'Super',
        price: 150000,
        includeService: ['Boarding Accommodations', 'Feeding and Hydration', 'Exercise and Playtime', 'Grooming Services'],
      },
    ],
  };

  return (
    <div>
      <section id='home'>
        <div className='hero min-h-screen bg-base-200'>
          <div className='hero-content flex-col lg:flex-row-reverse'>
            <Image src='/images/Hero-image.png' className='max-w-[300px] rounded-lg' alt='' width={300} height={300} />
            <div>
              <h1 className='text-3xl font-bold'>Tailored Stays for Every Fur-tastic Friend</h1>
              <p className='py-6'>Welcome to our pet hotel, where personalized care awaits every wagging tail, purring cat, and binky-hopping rabbit! 🐾✨.</p>
              <Link className='btn btn-primary' href='/#service-type'>
                Lets take a look ^-^{' '}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id='service-type'>
        <div className='divider'>
          <h2 className='text-2xl font-bold'>Our Service Type</h2>
        </div>

        <div className='flex flex-wrap gap-4 justify-center'>
          {services.serviceTypes.map(function (service, index) {
            return (
              <div key={index} className='card card-compact w-72 bg-base-100 shadow-xl'>
                <figure>
                  <Image src={service.image} alt={service.title} width={300} height={300} />
                </figure>
                <div className='card-body'>
                  <h2 className='card-title'>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id='review' className='bg-base-200 h-fit'>
        <div className='divider'>
          <h2 className='text-2xl font-bold'>Our Happy Customer</h2>
        </div>
        <div className='flex flex-wrap gap-4'>
          <div className='card'>
            <div className='chat chat-end'>
              <div className='chat-image avatar'>
                <div className='w-12 rounded-full'>
                  <Image alt='Tailwind CSS chat bubble component' src='/images/photo.jpg' width={300} height={300} />
                </div>
              </div>
              <div className='chat-bubble'>It was said that you would, destroy the Sith, not join them.</div>
              <p>- Pet Owner</p>
            </div>
          </div>

          <div className='card'>
            <div className='chat chat-end'>
              <div className='chat-image avatar'>
                <div className='w-12 rounded-full'>
                  <Image alt='Tailwind CSS chat bubble component' src='/images/photo.jpg' width={300} height={300} />
                </div>
              </div>
              <div className='chat-bubble'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip{' '}
              </div>
              <p>- Pet Owner</p>
            </div>
          </div>

          <div className='card'>
            <div className='chat chat-end'>
              <div className='chat-image avatar'>
                <div className='w-12 rounded-full'>
                  <Image alt='Tailwind CSS chat bubble component' src='/images/photo.jpg' width={300} height={300} />
                </div>
              </div>
              <div className='chat-bubble'>Lorem ipsum dolor sit amet, </div>
              <p>- Pet Owner</p>
            </div>
          </div>
        </div>
      </section>

      <section id='faq'>
        <div className='divider'>
          <h2 className='text-2xl font-bold'>FAQ</h2>
        </div>
        {faqs.map(function (faq, index) {
          return (
            <div key={index} className='collapse bg-base-200 mb-4'>
              <input type='radio' name='my-accordion-1' defaultChecked={index === 0} />
              <div className='collapse-title text-xl font-medium'>{faq.question}</div>
              <div className='collapse-content'>
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </section>

      <footer className='footer p-10 bg-neutral text-neutral-content'>
        <aside>
          <svg width='50' height='50' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd' className='fill-current'>
            <path d='M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z'></path>
          </svg>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <section id='contact'>
            <h6 className='footer-title'>Contact Us</h6>
            <ul>
              <li>Email : example.com</li>
              <li>Phone : +6293019209201</li>
            </ul>
          </section>
        </nav>
      </footer>
    </div>
  );
};
