'use client';
import React, { useState } from 'react';
import style from './setting.module.css';
import { ic_AdminEditBtn } from '@/src/Utils/svg';
import Dropdown from '@/src/Component/FormElement/Dropdown';
import Heading3Fonts from '@/src/Typography/text/Heading3Fonts';
import { useRouter } from 'next/navigation';
import Button from '@/src/Component/FormElement/Button';

const StandardizedDeduction = () => {
    const currentYear = new Date().getFullYear();
    const router = useRouter()
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const yearOptions = Array.from(new Array(50), (val, index) => ({
        name: (currentYear - index).toString(),
        value: currentYear - index,
    }));

    const deductionData = {
        2024: [
            {
                fillingStatus: 'Single',
                standardDeduction: 12000,
                additionalSenior: 1300,
                additionalBlind: 1400
            },
            {
                fillingStatus: 'Married Filing Jointly',
                standardDeduction: 24000,
                additionalSenior: 2600,
                additionalBlind: 2800
            },
            {
                fillingStatus: 'Head of Household',
                standardDeduction: 18000,
                additionalSenior: 1950,
                additionalBlind: 2100
            },
        ],
        2023: [
            {
                fillingStatus: 'Single',
                standardDeduction: 11201,
                additionalSenior: 1201,
                additionalBlind: 1301
            },
            {
                fillingStatus: 'Married Filing Jointly',
                standardDeduction: 22401,
                additionalSenior: 2401,
                additionalBlind: 2601
            },
            {
                fillingStatus: 'Head of Household',
                standardDeduction: 16801,
                additionalSenior: 1801,
                additionalBlind: 1951
            },
        ],
    };

    const selectedYearData = deductionData[selectedYear] || [];

    const EditeClick = () => {
        router.push('/adminsettings/editstandardizededuction')
    }
    const ADDClick = () => {
        router.push('/adminsettings/addstandardizededuction')
    }

    return (
        <div>
            <div className={style.MainDivForFederalTaxTable}>
                <div className={selectedYearData.length == 0 ? style.MainDivForTabHedingsSDS : style.MainDivForTabHedingsSD}>
                    <div className={style.MainDivForHadingText}>
                        <div className={style.FederalTaxTaxt}>Standard Deduction Rates</div>
                        <div className={style.ReviewAdjustText}>Review and adjust the standard Deduction Rates, including additional reduction for seniors and blind individuals.</div>
                    </div>

                    {selectedYearData.length === 0 ? (
                        <div className={style.AddBtnDivRates}>
                            <Button onClick={() => ADDClick()} text={'+ Add Standard Deduction Rates'} />
                        </div>
                    ) : (
                        <div className={style.MainDivForHadingRightContent}>
                            <Dropdown
                                data={yearOptions}
                                value={selectedYear}
                                setValue={setSelectedYear}
                                className={style.DropDownValiue}
                                disable={false}
                            />
                            <button className={style.EditButton} onClick={EditeClick}>
                                {ic_AdminEditBtn.icon()} Edit
                            </button>
                        </div>
                    )}
                </div>

                {selectedYearData.length > 0 &&

                    <div className={style.SubHedingHederStandardizedDeduction}>
                        <Heading3Fonts className={style.SubHadingTextStandardizedDeduction} text={'Filling Status'} />
                        <Heading3Fonts className={style.SubHadingTextStandardizedDeduction} text={'Standard deduction'} />
                        <Heading3Fonts className={style.SubHadingTextStandardizedDeduction} text={'Additional deduction for seniors (65+)'} />
                        <Heading3Fonts className={style.SubHadingTextStandardizedDeduction} text={'Additional Deduction for blind'} />
                    </div>
                }

                {selectedYearData.map((deduction, index) => (
                    <div key={index} className={style.MainDivForDataStandardDeduction}>
                        <div className={style.SubMainDivForDataStandardDeduction}>{deduction.fillingStatus}</div>
                        <div className={style.SubMainDivForDataStandardDeduction}>${deduction.standardDeduction}</div>
                        <div className={style.SubMainDivForDataStandardDeduction}>${deduction.additionalSenior}</div>
                        <div className={style.SubMainDivForDataStandardDeduction}>${deduction.additionalBlind}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StandardizedDeduction;