import React from "react";
import style from './breadcumb.module.css'
import { ic_RightErow } from "@/src/Utils/svg";
import { useRouter } from "next/navigation";

const Breadcrumb = ({ paths }) => {
    const route = useRouter();



    return (
        <div className={style.mainDivForButtoneSubTitle}>
            {paths.map((path, index) => (
                <div key={index} className={style.breadcrumbItem}>
                    {path.route ? (
                        <>
                            <span
                                className={style.BackHadiengText}
                                onClick={() => route.push(path.route)}
                            >
                                {path.name}
                            </span>
                            <span className={style.RightErow}>{ic_RightErow.icon()}</span>
                        </>
                    ) : (
                        <span className={style.CurentPageText}>{path.name}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Breadcrumb;