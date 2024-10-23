'use client'
import React, { useState } from 'react';
import style from './setting.module.css';
import Backsvg from '@/src/Component/Back/Backsvg';
import { ic_AdminSetings } from '@/src/Utils/svg';
import StandardizedDeduction from './StandardizedDeduction';
import ManageDropdownItems from './ManageDropdownItems';
import TaxRates from './TaxRates';

const Adminsettings = () => {
    const [activeTab, setActiveTab] = useState('Tax Rates');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <Backsvg Svg={ic_AdminSetings.icon()} text={'Admin Settings'} />
            <div className={style.MainDivForHederTab}>
                <div
                    className={activeTab === 'Tax Rates' ? style.TextTabDivActivTab : style.TextTabDiv}
                    onClick={() => handleTabClick('Tax Rates')}
                >
                    Tax Rates
                </div>
                <div
                    className={activeTab === 'Standardized Deduction' ? style.TextTabDivActivTab : style.TextTabDiv}
                    onClick={() => handleTabClick('Standardized Deduction')}
                >
                    Standardized Deduction
                </div>
                <div
                    className={activeTab === 'State Tax List' ? style.TextTabDivActivTab : style.TextTabDiv}
                    onClick={() => handleTabClick('State Tax List')}
                >
                    State Tax List
                </div>
                <div
                    className={activeTab === 'Manage Dropdown Items' ? style.TextTabDivActivTab : style.TextTabDiv}
                    onClick={() => handleTabClick('Manage Dropdown Items')}
                >
                    Manage Dropdown Items
                </div>
            </div>
            {activeTab === 'Tax Rates' && <TaxRates />}
            {activeTab === 'Standardized Deduction' && <StandardizedDeduction />}
            {activeTab === 'Manage Dropdown Items' && <ManageDropdownItems />}
        </>
    );
};

export default Adminsettings;