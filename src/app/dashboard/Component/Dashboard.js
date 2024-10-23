"use client";
import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import Heading2Fonts from "@/src/Typography/text/Heading2Fonts";
import CaptionFont from "@/src/Typography/text/CaptionFont";
import DisplayFont from "@/src/Typography/text/DisplayFont";
import DataTable from "react-data-table-component";
import {
  ic_FilterIcon,
  ic_Total_Customers,
  ic_TotalPlans,
  ic_TotalProFormaCreated,
  ic_TotalRevenue,
  ic_TotalRevenue_Progresh,
} from "@/src/Utils/svg";
import AnalyticsDashboard from "./Chart";
import axios from "axios";
import moment from "moment";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
function Dashboard() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const staticProfiles = [
    {
      full_name: "John Doe",
      createdAt: "2023-01-15T10:00:00Z",
      profileCount: 5,
      proformaCounts: { proformaCount: 2 },
    },
    {
      full_name: "Jane Smith",
      createdAt: "2023-02-10T10:00:00Z",
      profileCount: 3,
      proformaCounts: { proformaCount: 1 },
    },
    {
      full_name: "Steve Smith",
      createdAt: "2023-02-10T10:00:00Z",
      profileCount: 2,
      proformaCounts: { proformaCount: 1 },
    },
    {
      full_name: "Pat Smith",
      createdAt: "2023-02-10T10:00:00Z",
      profileCount: 1,
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
    {
      name: "Name",
      selector: (profiles) => profiles.full_name,
      sortable: true,
      searchable: true,
    },
    {
      name: "Date Created",
      selector: (profiles) => moment(profiles.createdAt).format("MM/DD/YYYY"),
      sortable: true,
      searchable: true,
    },
    {
      name: "Number of Clients",
      selector: (profiles) => profiles.profileCount,
      sortable: true,
      searchable: true,
    },
    {
      name: "Pro Forma created",
      selector: (profiles) => profiles.proformaCounts.proformaCount,
      sortable: true,
      searchable: true,
    },
    {
      name: "Plan Type",
      cell: (profiles) => <button className="PremiumButton">Premium +</button>,
    },
  ];

  const filteredProfiles = profiles.filter((profile) => {
    return (
      profile.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Heading2Fonts text={"Dashboard"} className={style.DashboardHeding} />
      <div>
        <div className={style.MainDivForCartSection}>
          <div className={style.MainDivForCart}>
            <div className={style.MainDivForTotleRevenue}>
              <div className={style.mainDivForRevenueSvg}>
                <div className={style.mainDivForSvg}>
                  {ic_TotalRevenue.icon()}
                </div>
                <CaptionFont text={"Total Revenue"} />
              </div>
              <div className={style.ParsetegeManageMainDiv}>
                <span className={style.ParsetegeManage}>12%</span>
                <span className={style.ProgreshSvg}>
                  {ic_TotalRevenue_Progresh.icon()}
                </span>
              </div>
            </div>
            <div className={style.mainDivForNumberValue}>
              <DisplayFont text={"$ 24,566"} />
              <div className={style.inlastMonthText}>in last month</div>
            </div>
          </div>
          <div className={style.MainDivForCart}>
            <div className={style.MainDivForTotleRevenue}>
              <div className={style.mainDivForRevenueSvg}>
                <div className={style.mainDivForSvg1}>
                  {ic_Total_Customers.icon()}
                </div>
                <CaptionFont text={"Total Customers "} />
              </div>
              <div className={style.ParsetegeManageMainDiv}>
                <span className={style.ParsetegeManage}>12%</span>
                <span className={style.ProgreshSvg}>
                  {ic_TotalRevenue_Progresh.icon()}
                </span>
              </div>
            </div>
            <div className={style.mainDivForNumberValue}>
              <DisplayFont text={"2,234"} />
              <div className={style.inlastMonthText}>in last month</div>
            </div>
          </div>
          <div className={style.MainDivForCart}>
            <div className={style.MainDivForTotleRevenue}>
              <div className={style.mainDivForRevenueSvg}>
                <div className={style.mainDivForSvg2}>
                  {ic_TotalProFormaCreated.icon()}
                </div>
                <CaptionFont text={"Total Pro Forma Created"} />
              </div>
              <div className={style.ParsetegeManageMainDiv}>
                <span className={style.ParsetegeManage}>12%</span>
                <span className={style.ProgreshSvg}>
                  {ic_TotalRevenue_Progresh.icon()}
                </span>
              </div>
            </div>
            <div className={style.mainDivForNumberValue}>
              <DisplayFont text={"254"} />
              <div className={style.inlastMonthText}>in last month</div>
            </div>
          </div>
          <div className={style.MainDivForCart}>
            <div className={style.MainDivForTotleRevenue}>
              <div className={style.mainDivForRevenueSvg}>
                <div className={style.mainDivForSvg2}>
                  {ic_TotalPlans.icon()}
                </div>
                <CaptionFont text={"Total Plans"} />
              </div>
            </div>
            <div className={style.mainDivForNumberValue}>
              <DisplayFont text={"04"} />
              <div className={style.GoToManagePlans}>Go to Manage Plans</div>
            </div>
          </div>
        </div>
        <div className={style.BarGraphMainDiv}>
          <AnalyticsDashboard />
        </div>

        <div className="MainDivForDataTable">
          <div className="MainDivForCustomersSearchFilterText">
            <div className="MainDivForHadingAndCount">
              <HeadingTextH1 text={"Customers"} />
              <HeadingTextH1 className="Customercount" text={"(50)"} />
            </div>
            <div className="SerchMainDivDataTable">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="SearchInput"
              />
            </div>
            <div>
              <div className="FilterText">{ic_FilterIcon.icon()}Filter</div>
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
      </div>
    </>
  );
}

export default Dashboard;
