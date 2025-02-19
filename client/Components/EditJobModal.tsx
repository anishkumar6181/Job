import React from 'react';
import { useForm } from 'react-hook-form';
import { Job } from '@/types/types';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import toast from 'react-hot-toast';

interface EditJobModalProps {
  job: Job;
  closeModal: () => void;
  onSubmit: (data: Partial<Job>) => Promise<void>;
}

const EditJobModal = ({ job, closeModal, onSubmit }: EditJobModalProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      jobType: job.jobType,
      tags: job.tags.join(', '),
      skills: job.skills.join(', '),
      salaryType: job.salaryType,
      negotiable: job.negotiable
    }
  });

  const onFormSubmit = async (data: any) => {
    try {
      // Validate required fields
      if (!data.title || !data.description || !data.location) {
        throw new Error('Please fill in all required fields');
      }
  
      // Format data before submission
      const formattedData = {
        ...data,
        skills: data.skills.split(',').map((skill: string) => skill.trim()),
        tags: data.tags.split(',').map((tag: string) => tag.trim()),
        salary: Number(data.salary)
      };
  
      await onSubmit(formattedData);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Input
        {...register('title', { required: 'Title is required' })}
        placeholder="Job Title"
      />
      {errors.title && <span className="text-red-500">{errors.title.message}</span>}

      <Textarea
        {...register('description', { required: 'Description is required' })}
        placeholder="Job Description"
      />

      <Input
        {...register('location', { required: 'Location is required' })}
        placeholder="Location"
      />

      <Input
        {...register('salary', { required: 'Salary is required' })}
        type="number"
        placeholder="Salary"
      />

      <Input
        {...register('jobType', { required: 'Job Type is required' })}
        placeholder="Job Type"
      />

      <Input
        {...register('tags')}
        placeholder="Tags (comma separated)"
      />

      <Input
        {...register('skills')}
        placeholder="Skills (comma separated)"
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditJobModal;