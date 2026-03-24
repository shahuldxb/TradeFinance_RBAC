
import { Fragment, useState } from "react";
import { KeenIcon } from "@/components";
import { toAbsoluteUrl } from "@/utils/Assets";
import { CommonHexagonBadge } from "@/partials/common";
import { apiFetch } from "@/utils/apiFetch";
const API_BASE = import.meta.env.VITE_BACKEND_URL;

const CheckConnection = () => {
    const [dbStatus, setDbStatus] = useState<string | null>(null);
    const [azureStatus, setAzureStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleDbCheck = () => {
        setDbStatus("success");
    };

    const handleAzureCheck = () => {
        setAzureStatus("success");
    };
    const handleCheckConnectivity = async () => {
        setLoading(true);
        setDbStatus(null);
        setAzureStatus(null);

        try {
            const response = await apiFetch(`${API_BASE}/api/lc/connectivity`);
            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();

            setDbStatus(data.database.status === true ? "success" : "failed");
            setAzureStatus(data.azure.status === true ? "success" : "failed");

        } catch (err) {
            console.error(err);
            setDbStatus("failed");
            setAzureStatus("failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <Fragment>
            <style>
                {`
          .conn-bg {
            background-image: url('${toAbsoluteUrl("/media/images/2600x1200/bg-5.png")}');
          }
          .dark .conn-bg {
            background-image: url('${toAbsoluteUrl("/media/images/2600x1200/bg-5-dark.png")}');
          }
        `}
            </style>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Database Card */}
                <div className="card shadow-sm border border-gray-200">
                    <div className="card-header py-5">
                        <h3 className="card-title text-xl font-semibold">Database Connection</h3>
                    </div>

                    <div className="card-body pt-2 pb-6 grid gap-6">
                        <p className="text-gray-700 leading-relaxed text-sm">
                            Validate your application's database connectivity.
                            This ensures that your system can fetch and store data reliably between all environments.
                        </p>

                        <div
                            className="flex items-center justify-between border border-gray-200 rounded-xl p-5 
              backdrop-blur conn-bg bg-no-repeat bg-[length:600px]"
                        >
                            <div className="flex items-center gap-4">
                                <CommonHexagonBadge
                                    stroke="stroke-success"
                                    fill="fill-success-light"
                                    size="size-[55px]"
                                    badge={<img
                                        src="/media/images/FrameworkImages/database.png"
                                        alt="Azure"
                                        className="w-6 h-6"
                                    />}
                                />

                                <div className="flex flex-col">
                                    <span className="text-base font-medium text-gray-900">Check Database</span>
                                    <span className="text-gray-600 text-sm">Run a quick connectivity test.</span>
                                </div>
                            </div>

                            <button className="btn btn-primary btn-outline btn-sm"
                                onClick={handleCheckConnectivity}
                                disabled={loading}
                            >
                                {loading ? "Checking..." : "Test"}
                            </button>
                        </div>

                        {dbStatus === "success" && (
                            <div className="flex items-center gap-2 text-green-600 text-sm">
                                <KeenIcon icon="check" className="text-lg" />
                                Database Connection Successful
                            </div>
                        )}

                        {dbStatus === "failed" && (
                            <div className="flex items-center gap-2 text-red-600 text-sm">
                                <KeenIcon icon="cross" className="text-lg" />
                                Database Connection Failed
                            </div>
                        )}
                    </div>
                </div>

                {/* Azure Card */}
                <div className="card shadow-sm border border-gray-200">
                    <div className="card-header py-5">
                        <h3 className="card-title text-xl font-semibold">Azure AI Connection</h3>
                    </div>

                    <div className="card-body pt-2 pb-6 grid gap-6">
                        <p className="text-gray-700 leading-relaxed text-sm">
                            Verify connectivity to Azure OpenAI endpoints.
                            Ensures your application can access AI models for text analysis, classification, and automation tasks.
                        </p>

                        <div className=" flex items-center justify-between border border-gray-200 rounded-xl p-5 backdrop-blur conn-bg bg-no-repeat bg-[length:600px]" >
                            <div className="flex items-center gap-4 ">
                                <CommonHexagonBadge
                                    stroke="stroke-primary"
                                    fill="fill-primary-light"
                                    size="size-[55px]"
                                    badge={
                                        <img
                                            src="/media/images/FrameworkImages/azure-icon-svgrepo-com.svg"
                                            alt="Azure"
                                            className="w-7 h-7"
                                        />
                                    }
                                />


                                <div className="flex flex-col">
                                    <span className="text-base font-medium text-gray-900">Check Azure AI</span>
                                    <span className="text-gray-600 text-sm">Validate API availability.</span>
                                </div>
                            </div>

                            <button className="btn  btn-primary btn-outline  btn-sm"
                                onClick={handleCheckConnectivity}
                                disabled={loading}>
                                {loading ? "Checking..." : "Test"}
                            </button>
                        </div>

                        {azureStatus === "success" && (
                            <div className="flex items-center gap-2 text-green-600 text-sm">
                                <KeenIcon icon="check" className="text-lg" />
                                Azure AI Connected Successfully
                            </div>
                        )}

                        {azureStatus === "failed" && (
                            <div className="flex items-center gap-2 text-red-600 text-sm">
                                <KeenIcon icon="cross" className="text-lg" />
                                Azure AI Connection Failed
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export { CheckConnection };
