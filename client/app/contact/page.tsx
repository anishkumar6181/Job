"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ContactPage(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const router = useRouter();

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error('Please enter a subject');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('http://localhost:8000/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          to: 'anishku6181@gmail.com'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      toast.success('Message sent successfully!');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (error: any) {
      setStatus('error');
      // Create a structured error object
      const errorDetails = {
        name: error.name,
        message: error.message || 'Failed to send message',
        code: error.code,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
        },
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      };
      
      console.error('Contact form error:', errorDetails);
      toast.error(errorDetails.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Input
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="min-h-[150px] bg-background border-border"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
              {status === 'success' && (
                <p className="text-green-500 text-center mt-4">
                  Message sent successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-center mt-4">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Us
              </h3>
              <p className="text-muted-foreground">anishku6181@gmail.com</p>
            </div>
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Us
              </h3>
              <p className="text-muted-foreground">+1 234 567 890</p>
            </div>
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Visit Us
              </h3>
              <p className="text-muted-foreground">
                123 Business Street<br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// export default function ContactPage() {
//   const [mounted, setMounted] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
//   const router = useRouter();

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       toast.error('Please enter your name');
//       return false;
//     }
//     if (!formData.email.trim()) {
//       toast.error('Please enter your email');
//       return false;
//     }
//     if (!formData.subject.trim()) {
//       toast.error('Please enter a subject');
//       return false;
//     }
//     if (!formData.message.trim()) {
//       toast.error('Please enter your message');
//       return false;
//     }
//     return true;
//   }; 

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     setStatus('idle');

//     try {
//       const response = await fetch('http://localhost:8000/api/v1/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name.trim(),
//           email: formData.email.trim(),
//           subject: formData.subject.trim(),
//           message: formData.message.trim(),
//           to: 'anishku6181@gmail.com'
//         }),
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to send message');
//       }

//       toast.success('Message sent successfully!');
//       setStatus('success');
//       setFormData({ name: '', email: '', subject: '', message: '' });
      
//       // Redirect after showing success message
//       setTimeout(() => {
//         router.push('/');
//       }, 2000);

//     } catch (error: any) {
//       setStatus('error');
//       console.error('Contact form error:', {
//         message: error.message,
//         error
//       });
//       toast.error(error.message || 'Failed to send message. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Handle hydration mismatch
//   if (!mounted) {
//     return null;
//   }

//   return (
//     <main className="bg-background min-h-screen">
//       <Header />
      
//       <div className="max-w-5xl mx-auto px-4 py-12">
//       {mounted && (
//         <>
//         <h1 className="text-4xl font-bold text-foreground mb-8">Contact Us</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="col-span-2">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <Input
//                   placeholder="Your Name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   required
//                   className="bg-background border-border"
//                 />
//               </div>
              
//               <div>
//                 <Input
//                   type="email"
//                   placeholder="Your Email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   required
//                   className="bg-background border-border"
//                 />
//               </div>
              
//               <div>
//                 <Input
//                   placeholder="Subject"
//                   value={formData.subject}
//                   onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                   required
//                   className="bg-background border-border"
//                 />
//               </div>
              
//               <div>
//                 <Textarea
//                   placeholder="Your Message"
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   required
//                   className="min-h-[150px] bg-background border-border"
//                 />
//               </div>
              
//               <Button 
//                 type="submit" 
//                   className="w-full" 
//                    disabled={loading}
//                 >
//                 {loading ? 'Sending...' : 'Send Message'}
//                 </Button>
//                 {status === 'success' && (
//                    <p className="text-green-500 text-center mt-4">
//                       Message sent successfully!
//                     </p>
//                   )}
//                   {status === 'error' && (
//                   <p className="text-red-500 text-center mt-4">
//                    Failed to send message. Please try again.
//                   </p>
//                 )}
//             </form>
//           </div>
          
//           <div className="space-y-6">
//             <div className="p-6 bg-muted rounded-lg">
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <Mail className="h-5 w-5" />
//                 Email Us
//               </h3>
//               <p className="text-muted-foreground">anishku6181@gmail.com</p>
//             </div>
            
//             <div className="p-6 bg-muted rounded-lg">
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <Phone className="h-5 w-5" />
//                 Call Us
//               </h3>
//               <p className="text-muted-foreground">+1 234 567 890</p>
//             </div>
            
//             <div className="p-6 bg-muted rounded-lg">
//               <h3 className="font-semibold mb-4 flex items-center gap-2">
//                 <MapPin className="h-5 w-5" />
//                 Visit Us
//               </h3>
//               <p className="text-muted-foreground">
//                 123 Business Street
//                 <br />
//                 New York, NY 10001
//               </p>
//             </div>
//           </div>
//         </div>
//         </>

//               )}

//       </div>

//       <Footer />
//     </main>
//   );
// }