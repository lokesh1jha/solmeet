import React, { useState } from 'react';
interface TagInputProps {
    tags: string[];
    setTags: (tags: string[]) => void;
    suggestions: string[];
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags, suggestions }) => {
    const [input, setInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim() !== '') {
            if (!tags.includes(input.trim())) {
                setTags([...tags, input.trim()]);
            }
            setInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handleSuggestionClick = (suggestion: string) => {
        if (!tags.includes(suggestion)) {
            setTags([...tags, suggestion]);
        }
    };

    return (
        <div className="tag-input p-4 border rounded">
            <div className="tags flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                    <div key={tag} className="tag bg-blue-500 text-white px-2 py-1 rounded flex items-center">
                        {tag}
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-white"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag"
                className="w-full p-2 border rounded mb-2"
            />
            <div className="suggestions flex flex-wrap gap-2">
                {suggestions.map(suggestion => (
                    <div
                        key={suggestion}
                        className="suggestion bg-gray-200 px-2 py-1 rounded cursor-pointer text-black"
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        {suggestion}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagInput;