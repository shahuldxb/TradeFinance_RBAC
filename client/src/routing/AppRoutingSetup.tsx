import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthPage } from '@/auth';
import { RequireAuth } from '@/auth/RequireAuth';
import { Demo1Layout } from '@/layouts/demo1';
import LcForm from '@/pages/LCFormFiles/LcForm';
import { ErrorsRouting } from '@/errors';
import PromptManagement from '@/pages/FrameworkFiles/PromptManagement';
import CreatePrompt from '@/pages/FrameworkFiles/promptscreen/CreatePrompt';
import Billing from '@/pages/Billing/Billing';
import AccountSettingsSidebarPage from '@/pages/Sanction/AccountSettingsSidebarPage';
import FourtySixA from '@/pages/46A/FourtySixA';
import DocumentDetails from '@/pages/46A/Documentdetails';
import AccountSettingsSidebarPages from '@/pages/Trade_Based_ML/AccountSettingsSidebarPage';
import GoodsMatching from '@/pages/goodsMatcher/GoodsMatching';
import Dashboard from '../pages/OCR/OCR/Dashboard.tsx';
import Upload from "../pages/OCR/OCR/Upload.tsx";
import Sessions from "../pages/OCR/OCR/Sessions.tsx";
import SessionDetailNew from "../pages/OCR/OCR/SessionDetailNew.tsx";
import MagicBox from '../pages/OCR/OCR/Magic_box.tsx';
import MTConverter from '@/pages/MTConverter/MTConverter';
import MTValidator from '@/pages/MTConverter/MTValidator.tsx';
import VesselTracking from '@/pages/external/VesselTracking.tsx';
import AmendmentVerification from '@/pages/LCFormFiles/Amendment/AmendmentVerification';
import CrossDocument from '@/pages/LCFormFiles/CrossDocument/CrossDocument';
import Cure from '@/pages/Cure/Cure.tsx';
import PolicyQA from '@/pages/knowledge_Base_Management/TradeFinanceQA.tsx';
import MagicBoxResults from '@/pages/OCR/OCR/MagicBoxResults.tsx';
import TBMLDetector from '@/pages/external/TBMLDetector.tsx';
import PaddleOcr from '@/pages/external/PaddleOcr.tsx';
import AIPlaybook from '@/pages/external/AIPlaybook.tsx';
import Discrebancy_learning_system from '@/pages/external/Discrebancy_learning_system.tsx';
import Customer from '@/pages/customerPortal/Customer.tsx';
import StandardsIngestion from '@/pages/ingestion/StandardsIngestion';
import StandardsIngestionCrud from '@/pages/ingestion/StandardsIngestionCrud';
import TFStandards from '@/pages/Tf_Standards/Home.tsx';
import MOCMapping from '@/pages/OCR/OCR/MOCMapping.tsx';
import CureTable from '@/pages/Cure/CureTable.tsx';
import Mlc_Validation from '@/pages/MLC/Mlc_Validation.tsx';
import LandingPage from '@/pages/Landing/LandingPage';
import VesselTrackingApp from '@/pages/vesselTracking/App.tsx';
import DiscrepancyTable from '@/pages/DiscrepancyTable/DiscrepancyTable.tsx';
import DiscrepancyResult from '@/pages/DiscrepancyTable/DiscrepancyResult.tsx';




const AppRoutingSetup = (): ReactElement => {
  return (
      <Routes>
        <Route path="auth/*" element={<AuthPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<Demo1Layout />}>
            <Route path="/framework/prompt-management" element={<PromptManagement />} />
            <Route path="/framework/prompt-management/create" element={<CreatePrompt />} />
            <Route path="/framework/prompt-management/edit/:id" element={<CreatePrompt />} />
            <Route path="/framework/prompt-management/inherit/:id" element={<CreatePrompt inheritMode={true} />} />
            <Route path="/framework/prompt-management/view/:id" element={<CreatePrompt viewMode={true} />} />
            <Route path='/Form/LcForm' element={<LcForm />} ></Route>
            <Route path='/Billing' element={<Billing />} ></Route>
            <Route path='/MTconverter' element={<MTConverter />} ></Route>
            <Route path='/MTvalidator' element={<MTValidator />} ></Route>
            {/* <Route path="/vessel-tracking" element={<VesselTracking />} /> */}
            <Route path="/standards-ingestion" element={<StandardsIngestion />} />
            <Route path="/standards-ingestion/crud" element={<StandardsIngestionCrud />} />
            <Route path="/TBML_Detector" element={<TBMLDetector />} />
            <Route path="/AIPlaybook" element={<AIPlaybook />} />
            <Route path="/paddleocr" element={<PaddleOcr />} />
            <Route path="/customer-portal" element={<Customer />} ></Route>
            <Route path="/MOC_Mapping" element={<MOCMapping />} ></Route>

            <Route path="/discrepancy_learning_system" element={<Discrebancy_learning_system />} />
            <Route path='/Knowledge_Base_Management' element={<PolicyQA />} ></Route>
            <Route path='/AmendmentVerification/:instrument' element={<AmendmentVerification />}></Route>
            <Route path='/cross_doc_check/:instrument' element={<CrossDocument />}></Route>
            <Route path='/discrepancymanagement/:instrument' element={<LcForm />} ></Route>
            <Route path='/discrepancytable/:instrument' element={<DiscrepancyTable />} ></Route>
            <Route path='/discrepancyresult/:instrument' element={<DiscrepancyResult />} ></Route>
            <Route path='/cure' element={<Cure />} ></Route>
            <Route path='/curetable' element={<CureTable />} />
            {/* OCR Routes */}
            <Route path="/tf_genie/discrepancy/dashboard" element={<Dashboard />} />
            <Route path="/tf_genie/discrepancy/ocr-factory" element={<Sessions />} />
            <Route path="/tf_genie/discrepancy/create-session" element={<Upload />} />
            <Route path="/tf_genie/discrepancy/ocr-factory/:sessionId" element={<SessionDetailNew />} />
            <Route path="/magic-box/results" element={<MagicBoxResults />} />
            {/* ------------------ */}
            {/* sanction */}
            {/* ------------------ */}
            <Route path="/sanction" element={<AccountSettingsSidebarPage />} ></Route>
            {/* ------------------------ */}
            {/* 46A */}
            {/* ------------------------ */}
            <Route path="/form/46A" element={<FourtySixA />} ></Route>
            <Route path="/form/documents/:id" element={<DocumentDetails />} />
            {/* ------------------ */}
            {/* TBML */}
            {/* ------------------ */}

            <Route path="/TBML" element={<AccountSettingsSidebarPages />}></Route>
            <Route path="/GoodsMatcher" element={<GoodsMatching />}></Route>

            {/* Magic-Box */}
            <Route path="/magic-box" element={<MagicBox />} />

            {/* Tf Standards */}
            <Route path="/trade-finance-standards" element={<TFStandards />} />

            {/* MLC Validation */}
            <Route path="/mlc/home" element={<Mlc_Validation />} />

            {/* Vessel Tracking App */}
            <Route path="/vessel-tracking-app/*" element={<VesselTrackingApp />} />




          </Route>
        </Route>
        <Route path="error/*" element={<ErrorsRouting />} />
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Routes>
  );
};

export { AppRoutingSetup };
