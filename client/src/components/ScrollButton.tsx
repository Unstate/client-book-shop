import React, { useState, useEffect } from 'react';

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

const ScrollButton: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);



    return (

        <button
            className={`fixed w-[100px] h-[100px] rounded-[50%] bg-white
                        bottom-[50px] left-[50px] border-[#160F29] border-[2px]
                        ${visible ? 'block ' : 'hidden'}`}
            onClick={scrollToTop}
        >
            <div className='text-[60px] text-[#160F29]'>🠕</div>
        </button>

    );
};

export default ScrollButton;