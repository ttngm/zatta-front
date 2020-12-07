import React from 'react';
import './RegistKeywordPage.css';
import RegisterPart from './RegisterPart';
import WordListPart from './WordListPart';


function RegistKeywordPage() {
    return (
        <div className="RegisterKeyword">
            <RegisterPart />
            <WordListPart />
        </div>
    );
}

export default RegistKeywordPage;