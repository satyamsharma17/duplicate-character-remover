import { useState } from 'react';
import './App.css';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [newString, setNewString] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() === '') {
            alert('Please enter a non-empty value!');
        } else {
            setNewString(inputValue.trim());
        }
    };

    const handleDelete = (charOne, index) => {
        var filteredString = "";
        for (let i = 0; i < newString.length; i++) {
            if (newString[i] == charOne) {
                if (i == index) {
                    filteredString += newString[i];
                }
            } else {
                filteredString += newString[i];
            }
        }
        setNewString(filteredString);
    };

    const renderCards = () => {
        const charCounts = {};
        const charColors = {};
        for (let i = 0; i < newString.length; i++) {
            const char = newString[i];
            if (!charCounts[char]) {
                charCounts[char] = 1;
                charColors[char] = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`; // assign a random color to this character
            } else {
                charCounts[char]++;
            }
        }

        if (Object.values(charCounts).every(count => count === 1)) {
            return (
                <div>
                    <h2>Success!</h2>
                    <p>Every character in the string is unique.</p>
                </div>
            );
        }

        const cards = [];
        for (let i = 0; i < newString.length; i++) {
            const char = newString[i];
            if (charCounts[char] > 1) {
                cards.push(
                    <div
                        className='card'
                        key={i}
                        style={{
                            display: 'inline-block',
                            padding: '10px',
                            margin: '10px',
                            backgroundColor: charColors[char], // use the assigned color for this character
                        }}
                    >
                        <button className='delete-btn' onClick={() => handleDelete(char, i)}>X</button>
                        <span className='char'>{char}</span>
                    </div>
                );
                charCounts[char] = 0;
            } else {
                cards.push(
                    <div
                        className='card'
                        key={i}
                        style={{
                            display: 'inline-block',
                            padding: '10px',
                            margin: '10px',
                            backgroundColor: charColors[char],
                        }}
                    >
                        <button className='delete-btn' onClick={() => handleDelete(char, i)}>X</button>
                        <span className='char'>{char}</span>
                    </div>
                );
            }
        }

        if (cards.length === 0) {
            return (
                <div className='success'>
                    <h2 className='success-msg'>Success!</h2>
                    <p>No characters with more than one instance found.</p>
                </div>
            );
        }

        return (
            <div className='cards'>
                <h2 className='card-title'>Cards:</h2>
                {cards}
            </div>
        );
    };

    const renderScreen1 = () => {
        return (
            <form onSubmit={handleFormSubmit}>
                <label>
                    Enter a string:
                    <input type="text" value={inputValue} onChange={handleInputChange} />
                </label>
                <button className='submit-btn' type="submit">Submit</button>
            </form>
        );
    };

    const renderScreen2 = () => {
        return (
            <div className='container'>
                <button className='back-btn' onClick={() => setNewString('')}>Back</button>
                <h2 className='original-str'>Original String: {inputValue}</h2>
                <h2 className='new-str'>New String: {newString}</h2>
                {renderCards()}
            </div>
        );
    };

    return (
        <div className="App">
            {newString === '' ? renderScreen1() : renderScreen2()}
        </div>
    );
}

export default App;
