import React, { useState } from 'react';

interface CreateClassFormProps {
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    className: string;
    classCode: string;
    classDescription: string;
}

const CreateClassForm: React.FC<CreateClassFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        className: '',
        classCode: '',
        classDescription: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="className">Class Name:</label>
                <input
                    type="text"
                    id="className"
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="classCode">Class Code:</label>
                <input
                    type="text"
                    id="classCode"
                    name="classCode"
                    value={formData.classCode}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="classDescription">Class Description:</label>
                <textarea
                    id="classDescription"
                    name="classDescription"
                    value={formData.classDescription}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <button type="submit">Create Class</button>
        </form>
    );
};

export default CreateClassForm;