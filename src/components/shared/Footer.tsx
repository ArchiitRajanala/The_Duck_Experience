// filepath: /instagram-clone/instagram-clone/src/components/shared/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <div>
                <p>&copy; {new Date().getFullYear()} Instagram Clone. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;