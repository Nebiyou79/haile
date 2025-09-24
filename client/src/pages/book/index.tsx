/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/book/index.tsx
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';

// ✅ Dynamically use NEXT_PUBLIC_API_URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  appointmentType: 'in-person' | 'virtual';
  date: Date | null;
  timeSlot: TimeSlot | null;
  notes: string;
}

export default function BookConsultation() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [availableSlots, setAvailableSlots] = useState<(TimeSlot & { isBlocked: boolean })[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: 'Tax Consultation',
    appointmentType: 'in-person',
    date: null,
    timeSlot: null,
    notes: ''
  });

  const services: string[] = [
    'Tax Consultation',
    'Accounting Services',
    'Financial Planning',
    'Business Advisory'
  ];

  // ✅ Fetch slots whenever date changes
  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots();
    }
  }, [formData.date]);

  const fetchAvailableSlots = async () => {
    if (!formData.date) return;

    try {
      setLoading(true);
      const dateStr = formData.date.toISOString().split('T')[0];

      const response = await axios.get(`${API_URL}/api/appointments/availability?date=${dateStr}`);

      // Filter slots: mark 9am–1pm as blocked
      const slots: (TimeSlot & { isBlocked: boolean })[] = response.data.map((slot: TimeSlot) => {
        const startHour = parseInt(slot.startTime.split(':')[0], 10);
        const isBlocked = startHour < 13; // morning blocked
        return { ...slot, isBlocked };
      });

      setAvailableSlots(slots);
    } catch (err: any) {
      console.error('Error fetching slots:', err);
      toast.error('Failed to fetch available time slots');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateSelect = (date: Date | null) => {
    setFormData(prev => ({ ...prev, date, timeSlot: null }));
    setStep(2);
  };

  const handleTimeSelect = (slot: TimeSlot & { isBlocked?: boolean }) => {
    if (slot.isBlocked) return;
    setFormData(prev => ({ ...prev, timeSlot: slot }));
    setStep(3);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.timeSlot) {
      toast.error('Please select a date and time');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/appointments`, {
        ...formData,
        date: formData.date.toISOString().split('T')[0]
      });
      toast.success('Appointment booked successfully!');
      router.push('/book/success');
    } catch (err: any) {
      console.error('Booking error:', err);
      toast.error(err.response?.data?.error || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Schedule Your Consultation
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book a meeting with our CPAs for professional guidance
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Step Header */}
            <div className="bg-blue-700 py-6 px-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-semibold">
                  {step === 1 && 'Select Date'}
                  {step === 2 && 'Select Time'}
                  {step === 3 && 'Your Information'}
                </h2>
                <span className="text-blue-200 bg-blue-900 px-3 py-1 rounded-full text-sm">
                  Step {step} of 3
                </span>
              </div>
            </div>

            <div className="p-8">
              {/* Step 1: Date */}
              {step === 1 && (
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Select a Date</h3>
                  <p className="text-gray-600 mb-6">Choose your preferred date (Mon–Fri)</p>
                  <div className="max-w-xs mx-auto border rounded-lg p-4 bg-gray-50">
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateSelect}
                      minDate={new Date()}
                      filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
                      inline
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Time */}
              {step === 2 && (
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Available Time Slots</h3>
                  <p className="text-gray-600 mb-6">
                    {formData.date?.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  {loading ? (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTimeSelect(slot)}
                          disabled={slot.isBlocked}
                          className={`rounded-xl p-4 border-2 transition-all duration-200 ${
                            slot.isBlocked
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-white text-gray-800 hover:border-blue-500 hover:bg-blue-50'
                          }`}
                        >
                          <div className="text-lg font-medium">
                            {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
                          </div>
                          <div className="text-sm mt-1">
                            {slot.isBlocked ? 'Unavailable (Busy 9am–1pm)' : formData.appointmentType === 'in-person' ? 'In-Office' : 'Virtual'}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Info */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800">Your Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Email Address" className="w-full px-4 py-3 border rounded-lg" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Phone Number" className="w-full px-4 py-3 border rounded-lg" />
                    <select name="service" value={formData.service} onChange={handleInputChange} required className="w-full px-4 py-3 border text-black rounded-lg">
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select name="appointmentType" value={formData.appointmentType} onChange={handleInputChange} required className="w-full px-4 py-3 text-black border rounded-lg">
                      <option value="in-person">In-Person</option>
                      <option value="virtual">Virtual</option>
                    </select>
                  </div>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={4} placeholder="Additional notes (optional)" className="w-full px-4 text-black py-3 border rounded-lg" />
                  <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                    {loading ? 'Processing...' : 'Confirm Appointment'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
