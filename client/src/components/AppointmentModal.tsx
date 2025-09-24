import React, { FC } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  comments: string;
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AppointmentFormData>();

  const onSubmit: SubmitHandler<AppointmentFormData> = async (data) => {
    try {
      const response = await fetch('/api/sendAppointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Appointment request sent successfully!');
        reset();
        onClose();
      } else {
        alert('Failed to send appointment request.');
      }
    } catch (error) {
      console.error('Error sending appointment request:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Manual backdrop */}
      <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
      
      {/* Modal content */}
      <div className="relative bg-white rounded-lg max-w-lg w-full mx-4 p-6 z-10">
        <Dialog.Title className="text-2xl font-semibold mb-4">Schedule an Appointment</Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full p-2 border rounded mt-1"
            />
            {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Comments</label>
            <textarea
              {...register('comments')}
              className="w-full p-2 border rounded mt-1"
              rows={4}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default AppointmentModal;
