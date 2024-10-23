'use client';
import React, { useState } from 'react';
import style from './setting.module.css';
import { ic_AdminEditBtn } from '@/src/Utils/svg';
import Dropdown from '@/src/Component/FormElement/Dropdown';
import Heading3Fonts from '@/src/Typography/text/Heading3Fonts';
import { useRouter } from 'next/navigation';
import Button from '@/src/Component/FormElement/Button';

const TaxRates = () => {
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [activeStatus, setActiveStatus] = useState('MarriedFilingJointly');

    const yearOptions = Array.from(new Array(50), (val, index) => ({
        name: (currentYear - index).toString(),
        value: currentYear - index,
    }));

    const Status = [
        { value: 'MarriedFilingJointly', name: 'Married Filing Jointly' },
        { value: 'Single', name: 'Single' },
        { value: 'MarriedFilingSeprately', name: 'Married Filing Separately' },
        { value: 'HeadOfHousehold', name: 'Head Of Household' }
    ];

    const taxData = {
        2024: {
            MarriedFilingJointly: [
                { incomeRange: ['$0', '$22,400'], taxRate: '10%' },
                { incomeRange: ['$22,401', '$89,450'], taxRate: '12%' },
                { incomeRange: ['$89,451', '$190,750'], taxRate: '22%' },
                { incomeRange: ['$190,751', '$364,200'], taxRate: '24%' },
                { incomeRange: ['$364,201', '$462,500'], taxRate: '32%' },
                { incomeRange: ['$462,501', '$693,750'], taxRate: '35%' },
                { incomeRange: ['$693,751', 'and above'], taxRate: '37%' },
            ],
            Single: [
                { incomeRange: ['$0', '$11,200'], taxRate: '10%' },
                { incomeRange: ['$11,201', '$44,725'], taxRate: '12%' },
                { incomeRange: ['$44,726', '$95,375'], taxRate: '22%' },
                { incomeRange: ['$95,376', '$182,100'], taxRate: '24%' },
                { incomeRange: ['$182,101', '$231,250'], taxRate: '32%' },
                { incomeRange: ['$231,251', '$578,125'], taxRate: '35%' },
                { incomeRange: ['$578,126', 'and above'], taxRate: '37%' },
            ],
        },
        2023: {
            MarriedFilingJointly: [
                { incomeRange: ['$0', '$21,800'], taxRate: '10%' },
                { incomeRange: ['$21,801', '$83,550'], taxRate: '12%' },
                { incomeRange: ['$83,551', '$178,150'], taxRate: '22%' },
                { incomeRange: ['$178,151', '$340,100'], taxRate: '24%' },
                { incomeRange: ['$340,101', '$431,500'], taxRate: '32%' },
                { incomeRange: ['$431,501', '$647,850'], taxRate: '35%' },
                { incomeRange: ['$647,851', 'and above'], taxRate: '37%' },
            ],
            Single: [
                { incomeRange: ['$0', '$10,275'], taxRate: '10%' },
                { incomeRange: ['$10,276', '$41,775'], taxRate: '12%' },
                { incomeRange: ['$41,776', '$89,075'], taxRate: '22%' },
                { incomeRange: ['$89,076', '$170,050'], taxRate: '24%' },
                { incomeRange: ['$170,051', '$215,950'], taxRate: '32%' },
                { incomeRange: ['$215,951', '$539,900'], taxRate: '35%' },
                { incomeRange: ['$539,901', 'and above'], taxRate: '37%' },
            ],
            // Add other statuses for 2023...
        },
        // Add more years and status as needed...
    };

    const selectedTaxBrackets = taxData[selectedYear]?.[activeStatus] || [];

    const EditSetting = () => {
        router.push('/adminsettings/editsetting');
    };

    return (
        <>
            <div>
                <div className={style.MainDivForFederalTaxTable}>
                    <div className={selectedTaxBrackets.length === 0 ? style.NoDataAvelabul : style.MainDivForTabHedings}>
                        <div className={style.MainDivForHadingText}>
                            <div className={style.FederalTaxTaxt}>Federal Tax Bracket</div>
                            <div className={style.ReviewAdjustText}>Review and adjust the federal tax rates applicable to social security funds.</div>
                        </div>
                        {selectedTaxBrackets.length > 0 && (
                            <div className={style.MainDivForHadingRightContent}>
                                <Dropdown
                                    data={Status}
                                    value={activeStatus}
                                    setValue={setActiveStatus}
                                    className={style.DropDownValiueStatus}
                                    disable={false}
                                />
                                <Dropdown
                                    data={yearOptions}
                                    value={selectedYear}
                                    setValue={setSelectedYear}
                                    className={style.DropDownValiue}
                                    disable={false}
                                />
                                <button className={style.EditButton} onClick={EditSetting}>
                                    {ic_AdminEditBtn.icon()}Edit
                                </button>
                            </div>
                        )}
                        {selectedTaxBrackets.length === 0 && (
                            <div className={style.AddBtnDivRates}>
                                <Button onClick={EditSetting} text={'+ Tax Rates'} />
                            </div>
                        )}
                    </div>

                    {selectedTaxBrackets.length > 0 && (
                        <div className={style.SubHedingHeder}>
                            <Heading3Fonts className={style.SubHadingText} text={'Income Range'} />
                            <Heading3Fonts className={style.SubHadingTextTaxRate} text={'Tax Rate'} />
                        </div>
                    )}

                    {selectedTaxBrackets.map((bracket, index) => (
                        <div key={index} className={style.SubHedingHederContent}>
                            <div className={style.SubHadingTextContent}>
                                <div className={style.SubContentText}>{bracket.incomeRange[0]}</div>
                                <div className={style.SubContentTextSecond}>{bracket.incomeRange[1]}</div>
                            </div>
                            <div className={style.SubContentTextSecondSection}>{bracket.taxRate}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TaxRates;
