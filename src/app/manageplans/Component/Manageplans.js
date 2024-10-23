// 'use client'
// import Backsvg from '@/src/Component/Back/Backsvg'
// import { ic_AddFileIconPlans, ic_AddPlanesPlushIcon, ic_AddPlanesPlushIconWhite, ic_CheckMark, ic_Delete, ic_DeletePlanes, ic_EditPlanes, ic_MainPlanes, ic_Manage_Plans } from '@/src/Utils/svg'
// import React from 'react'
// import style from './manageplans.module.css'
// import Heading3Fonts from '@/src/Typography/text/Heading3Fonts'
// import ToggleSwitch from '@/src/Component/FormElement/ToggleSwitch'
// import HeadingTextH1 from '@/src/Typography/text/HeadingTextH1'
// import MediumFont from '@/src/Typography/text/MediumFont'
// import Button from '@/src/Component/FormElement/Button'
// import PlanFeatures from './Planfeatures'
// import { useRouter } from 'next/navigation'

// const plansData = {

//     "plans": [
//         {
//             "type": "Standard",
//             "description": "A balanced plan providing essential tax optimization services with reliable support. Perfect for clients looking for solid performance at a reasonable price.",
//             "price": {
//                 "amount": 50,
//                 "interval": "month"
//             },
//             "features": [
//                 "Basic tax optimization",
//                 "Priority support",
//                 "Personalized advice",
//                 "Annual financial review"
//             ],
//             "enrolled": 234,
//             "Main": 0
//         },
//         {
//             "type": "Premium Plus",
//             "description": "A balanced plan providing essential tax optimization services with reliable support. Perfect for clients looking for solid performance at a reasonable price.",
//             "price": {
//                 "amount": 100,
//                 "interval": "month"
//             },
//             "features": [
//                 "Comprehensive tax optimization",
//                 "priority support",
//                 "personalized advice",
//                 "annual financial review"
//             ],
//             "enrolled": 234,
//             "Main": 1

//         }
//     ]
// }

// const Manageplans = () => {

//     const router = useRouter();

//     const handleAddPlanClick = () => {
//         router.push('/manageplans/addnewplans');
//     }
//     const handleEditPlanClick = () => {
//         router.push('/manageplans/editplans');
//     }



//     return (
//         <>
//             <Backsvg Svg={ic_Manage_Plans.icon()} text={'Manage Plans'} />
//             <div className={style.MainDivForManagePlans}>
//                 {plansData.plans.map((plan, index) => (
//                     <div key={index} className={style.MainDivForPlansCart}>
//                         {plan.Main === 1 && <div className={style.MainDivForPopularPlanMain}>{ic_MainPlanes.icon()}</div>}

//                         <Heading3Fonts className={style.HedingStanderd} text={plan.type} />
//                         <span className={style.DiscriptionTextHading}>{plan.description}</span>
//                         <div className={style.MainDivForToggalAndActiv}>
//                             <div className={style.ActivatePlanes}>Activate Plan</div>
//                             <ToggleSwitch className={style.YesNoSwitch} />
//                         </div>
//                         <HeadingTextH1
//                             className={style.PriceText}
//                             text={`Price: $${plan.price.amount}/${plan.price.interval}`}
//                         />
//                         <div>
//                             <MediumFont className={style.FeaturesText} text={'Features'} />
//                             {plan.features.map((feature, featureIndex) => (
//                                 <div key={featureIndex} className={style.MainDivForFeatures}>
//                                     <div>{ic_CheckMark.icon()}</div>
//                                     <div className={style.DiscriptionTextHading}>{feature}</div>
//                                 </div>
//                             ))}
//                             <div className={style.MainDivForEnrolled}>
//                                 <div className={style.EnrolledText}>{plan.enrolled} enrolled</div>
//                             </div>
//                             <div className={style.ActivatePlanesButtonMain}>
//                                 <button className={style.DeletePlan}>{ic_DeletePlanes.icon()}Delete Plan</button>
//                                 <button className={style.EditPlan} onClick={() => handleEditPlanClick()}>{ic_EditPlanes.icon()}Edit Plan</button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 {plansData.plans.length > 0 && (

//                     <div className={style.MainDivForAddPlansCart}>
//                         <div className={style.MainDivForSvgAndAddPlans} onClick={() => handleAddPlanClick()}>
//                             <div className={style.AddNewPlanSvgDiv}>{ic_AddPlanesPlushIcon.icon()}</div>
//                             <div className={style.AddNewPlanText}>Add new plan</div>
//                         </div>
//                     </div>
//                 )}

//                 {plansData.plans.length <= 0 && (
//                     <div className={style.MainDivForFirstPlan}>
//                         <div className={style.FileSvgIcon}>{ic_AddFileIconPlans.icon()}</div>
//                         <div className={style.MainDivForFirstPlanText}>
//                             <span className={style.NoPlansAvailableText}>No plans available</span>
//                             <span className={style.CreatFirstPlansText}>Create your first plan</span>
//                         </div>
//                         <Button svg={ic_AddPlanesPlushIconWhite.icon()} text={'Add plan'} onClick={() => handleAddPlanClick()} />
//                     </div>
//                 )}

//             </div>
//         </>
//     )
// }

// export default Manageplans

'use client';
import React, { useEffect, useState } from "react";
import Backsvg from '@/src/Component/Back/Backsvg';
import { ic_AddFileIconPlans, ic_AddPlanesPlushIcon, ic_AddPlanesPlushIconWhite, ic_CheckMark, ic_DeletePlanes, ic_EditPlanes, ic_MainPlanes, ic_Manage_Plans, ic_FilterIcon, ic_SortBtn } from '@/src/Utils/svg';
import style from './manageplans.module.css';
import Heading3Fonts from '@/src/Typography/text/Heading3Fonts';
import ToggleSwitch from '@/src/Component/FormElement/ToggleSwitch';
import HeadingTextH1 from '@/src/Typography/text/HeadingTextH1';
import MediumFont from '@/src/Typography/text/MediumFont';
import Button from '@/src/Component/FormElement/Button';
import { useRouter } from 'next/navigation';
import DataTable from "react-data-table-component";
import moment from "moment";
const initialPlansData = {
    "plans": [
        {
            "type": "Standard",
            "description": "A balanced plan providing essential tax optimization services with reliable support. Perfect for clients looking for solid performance at a reasonable price.",
            "price": {
                "amount": 50,
                "interval": "month"
            },
            "features": [
                "Basic tax optimization",
                "Priority support",
                "Personalized advice",
                "Annual financial review"
            ],
            "enrolled": 234,
            "Main": 0
        },
        {
            "type": "Premium Plus",
            "description": "A balanced plan providing essential tax optimization services with reliable support. Perfect for clients looking for solid performance at a reasonable price.",
            "price": {
                "amount": 100,
                "interval": "month"
            },
            "features": [
                "Comprehensive tax optimization",
                "priority support",
                "personalized advice",
                "annual financial review"
            ],
            "enrolled": 234,
            "Main": 1
        }
    ]
};

const Manageplans = () => {
    const [plansData, setPlansData] = useState(initialPlansData);
    const [searchTerm, setSearchTerm] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false);


    const router = useRouter();
    const staticProfiles = [
        {
            full_name: "Brdaley Lawlor",
            createdAt: "2023-01-15T10:00:00Z",
            Amount: '$2350',
            proformaCounts: { proformaCount: 2 },
        },
        {
            full_name: "Jerry Helfer",
            createdAt: "2023-02-10T10:00:00Z",
            Amount: '$4512',
            proformaCounts: { proformaCount: 1 },
        },
        {
            full_name: "Gareth Cuddy",
            createdAt: "2023-02-10T10:00:00Z",
            Amount: '$3459',
            proformaCounts: { proformaCount: 1 },
        },
        {
            full_name: "Kyle Luece",
            createdAt: "2023-02-10T10:00:00Z",
            Amount: '$1150',
            proformaCounts: { proformaCount: 1 },
        },
    ];
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setProfiles(staticProfiles);
            setLoading(false);
        }, 500);
    }, []);

    const columns = [
        { name: "Name", selector: profiles => profiles.full_name, sortable: true, searchable: true },
        { name: "Amount", selector: profiles => profiles.Amount, sortable: true, searchable: true },
        // { name: "Date", selector: profiles => moment(profiles.createdAt).format("MM/DD/YYYY"), sortable: true, searchable: true },
        {
            name: "Date",
            selector: profiles => moment(profiles.createdAt).format("MMM D, YYYY"),
            sortable: true,
            searchable: true
        },
        // { name: "Status", selector: profiles => profiles.proformaCounts.proformaCount, sortable: true, searchable: true },
        {
            name: "Status", cell: profiles => (
                <button className='StatusButton' >
                    Paid
                </button>
            ),
        },
        {
            name: "Plan Type",
            cell: profiles => (
                <button className='PremiumButton' >
                    Premium +
                </button>
            ),
        },
    ];

    const filteredProfiles = profiles.filter(profile => {
        return (
            profile.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });


    const handleAddPlanClick = () => {
        router.push('/manageplans/addnewplans');
    };

    const handleEditPlanClick = () => {
        router.push('/manageplans/editplans');
    };

    const handleDeletePlan = (index) => {
        const updatedPlans = plansData.plans.filter((_, i) => i !== index);
        setPlansData({ ...plansData, plans: updatedPlans });
    };

    return (
        <>
            <Backsvg Svg={ic_Manage_Plans.icon()} text={'Manage Plans'} />
            <div className={style.MainDivForManagePlans}>
                {plansData.plans.map((plan, index) => (
                    <div key={index} className={style.MainDivForPlansCart}>
                        {plan.Main === 1 && <div className={style.MainDivForPopularPlanMain}>{ic_MainPlanes.icon()}</div>}

                        <Heading3Fonts className={style.HedingStanderd} text={plan.type} />
                        <span className={style.DiscriptionTextHading}>{plan.description}</span>
                        <div className={style.MainDivForToggalAndActiv}>
                            <div className={style.ActivatePlanes}>Activate Plan</div>
                            <ToggleSwitch className={style.YesNoSwitch} />
                        </div>
                        <HeadingTextH1
                            className={style.PriceText}
                            text={`Price: $${plan.price.amount}/${plan.price.interval}`}
                        />
                        <div>
                            <MediumFont className={style.FeaturesText} text={'Features'} />
                            {plan.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className={style.MainDivForFeatures}>
                                    <div>{ic_CheckMark.icon()}</div>
                                    <div className={style.DiscriptionTextHading}>{feature}</div>
                                </div>
                            ))}
                            <div className={style.MainDivForEnrolled}>
                                <div className={style.EnrolledText}>{plan.enrolled} enrolled</div>
                            </div>
                            <div className={style.ActivatePlanesButtonMain}>
                                <button className={style.DeletePlan} onClick={() => handleDeletePlan(index)}>
                                    {ic_DeletePlanes.icon()}Delete Plan
                                </button>
                                <button className={style.EditPlan} onClick={() => handleEditPlanClick(plan)}>
                                    {ic_EditPlanes.icon()}Edit Plan
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {plansData.plans.length > 0 && (
                    <div className={style.MainDivForAddPlansCart}>
                        <div className={style.MainDivForSvgAndAddPlans} onClick={() => handleAddPlanClick()}>
                            <div className={style.AddNewPlanSvgDiv}>{ic_AddPlanesPlushIcon.icon()}</div>
                            <div className={style.AddNewPlanText}>Add new plan</div>
                        </div>
                    </div>
                )}

                {plansData.plans.length <= 0 && (
                    <div className={style.MainDivForFirstPlan}>
                        <div className={style.FileSvgIcon}>{ic_AddFileIconPlans.icon()}</div>
                        <div className={style.MainDivForFirstPlanText}>
                            <span className={style.NoPlansAvailableText}>No plans available</span>
                            <span className={style.CreatFirstPlansText}>Create your first plan</span>
                        </div>
                        <Button svg={ic_AddPlanesPlushIconWhite.icon()} text={'Add plan'} onClick={() => handleAddPlanClick()} />
                    </div>
                )}
            </div>



            {initialPlansData.plans.length > 0 &&

                <div className="MainDivForDataTable">
                    <div className="MainDivForCustomersSearchFilterText">
                        <div className="MainDivForHadingAndCount">
                            <HeadingTextH1 text={'Billing History'} />
                            <HeadingTextH1 className='Customercount' text={'(23)'} />


                        </div>
                        <div className='SerchMainDivDataTable'>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='SearchInput'
                            />
                        </div>
                        <div >
                            <div className='FilterText'>{ic_FilterIcon.icon()}Filter</div>
                            {/* {/ <div className='FilterText'>{ic_SortBtn.icon()}Sort By A-Z</div> /} */}
                            {/* {/ <div className='FilterText'>Filter</div> /} */}
                        </div>
                    </div>
                    <DataTable
                        keyField="_id"
                        title="Profiles List"
                        columns={columns}
                        data={filteredProfiles}
                        progressPending={loading}
                        pagination
                        paginationPerPage={2}
                        paginationRowsPerPageOptions={[5, 10, 20]}
                    />
                </div>
            }
        </>
    );
};

export default Manageplans;