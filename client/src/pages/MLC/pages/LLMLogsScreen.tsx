import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Coins, Eye } from "lucide-react";

export default function LLMLogsScreen() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/llm-logs?limit=100");

      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      console.log("Fetched logs:", data);
      setLogs(data);
    } catch (err) {
      console.error("Error fetching LLM logs:", err);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleString();
  };

  const getOperationBadgeColor = (type: string) => {
    switch (type) {
      case "enrich_instrument": return "bg-green-500";
      case "check_discrepancies": return "bg-red-500";
      case "apply_transformation": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getOperationLabel = (type: string) => {
    switch (type) {
      case "enrich_instrument": return "Enrich";
      case "check_discrepancies": return "Discrepancy Check";
      case "apply_transformation": return "Transformation";
      default: return type;
    }
  };

  // Calculate totals
  // console.log("logs:", logs);

  const logArray = logs ?? [];

  const totalPromptTokens = logArray.reduce(
    (sum, log) => sum + (log.promptTokens || 0),
    0
  );

  const totalCompletionTokens = logArray.reduce(
    (sum, log) => sum + (log.completionTokens || 0),
    0
  );

  const totalTokens = logArray.reduce(
    (sum, log) => sum + (log.totalTokens || 0),
    0
  );

  const formatJSON = (input: any) => {
    try {
      if (!input) return "No payload";

      // Step 1: Parse if string
      const parsed = typeof input === "string" ? JSON.parse(input) : input;

      // Step 2: Walk through object and clean strings
      const clean = (obj: any): any => {
        if (typeof obj === "string") {
          return obj.replace(/\\n/g, "\n"); // convert literal \n to real newlines
        }
        if (Array.isArray(obj)) return obj.map(clean);
        if (obj && typeof obj === "object") {
          const out: any = {};
          for (const k in obj) out[k] = clean(obj[k]);
          return out;
        }
        return obj;
      };

      const cleaned = clean(parsed);

      // Step 3: Pretty print
      return JSON.stringify(cleaned, null, 2);
    } catch {
      return input;
    }
  };


  const formatPayload = (input: any) => {
    try {
      if (!input) return "No payload";

      let text = typeof input === "string" ? input : JSON.stringify(input);

      // Remove ```json and ``` from AI response
      text = text.replace(/```json|```/g, "").trim();

      const parsed = JSON.parse(text);

      const clean = (obj: any): any => {
        if (typeof obj === "string") return obj.replace(/\\n/g, "\n");
        if (Array.isArray(obj)) return obj.map(clean);
        if (obj && typeof obj === "object") {
          const out: any = {};
          for (const k in obj) out[k] = clean(obj[k]);
          return out;
        }
        return obj;
      };

      const cleaned = clean(parsed);
      return JSON.stringify(cleaned, null, 2);
    } catch {
      return input;
    }
  };



  // console.log({ totalPromptTokens, totalCompletionTokens, totalTokens });

  return (
    <div className="container py-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500 hover:ring-blue-300 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">Total Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-red-500 hover:ring-red-300 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">Prompt Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPromptTokens.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-green-500 hover:ring-green-300 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">Completion Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletionTokens.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-500 hover:ring-purple-300 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium ">Total Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTokens.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                LLM Interaction Logs
              </CardTitle>
              <CardDescription>View all AI operations with full request/response payloads</CardDescription>
            </div>

          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading logs...</div>
          ) : logs?.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Operation</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead className="text-right">Prompt</TableHead>
                  <TableHead className="text-right">Completion</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Time (ms)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs?.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {formatDate(log.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getOperationBadgeColor(log.operationType) + " text-white capitalize"}>
                        {getOperationLabel(log.operationType)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.modelUsed || "gpt-4o"}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                        {(log.promptTokens || 0).toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                        {(log.completionTokens || 0).toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20">
                        {(log.totalTokens || 0).toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {log.processingTimeMs?.toLocaleString() || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge className={`p-2 bg-green-400 text-white rounded-lg`} variant={log.status === "success" ? "default" : "destructive"}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <div className={"capitalize"}>
                                {getOperationLabel(log.operationType)}
                              </div>
                              <span className="text-sm font-normal text-muted-foreground">
                                {formatDate(log.createdAt)}
                              </span>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {/* Token Stats */}
                            <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                              <Coins className="h-4 w-4" />
                              <span className="text-sm font-medium">Token Usage:</span>
                              <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900">
                                Prompt: {(log.promptTokens || 0).toLocaleString()}
                              </Badge>
                              <Badge variant="outline" className="bg-green-100 dark:bg-green-900">
                                Completion: {(log.completionTokens || 0).toLocaleString()}
                              </Badge>
                              <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900">
                                Total: {(log.totalTokens || 0).toLocaleString()}
                              </Badge>
                              <span className="text-sm text-muted-foreground ml-auto">
                                Processing: {log.processingTimeMs?.toLocaleString() || "-"}ms
                              </span>
                            </div>

                            <Tabs defaultValue="request" className="w-full">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="request">Request Payload</TabsTrigger>
                                <TabsTrigger value="response">Response Payload</TabsTrigger>
                              </TabsList>

                              {/* REQUEST */}
                              <TabsContent value="request" className="h-[520px]">
                                <div className="h-full overflow-hidden rounded-md border">
                                  <ScrollArea className="h-full p-4">
                                    <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                                      {formatPayload(log.requestPayload)}
                                    </pre>
                                  </ScrollArea>
                                </div>
                              </TabsContent>

                              {/* RESPONSE */}
                              <TabsContent value="response" className="h-[520px]">
                                <div className="h-full overflow-hidden rounded-md border">
                                  <ScrollArea className="h-full p-4">
                                    <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                                      {formatPayload(log.responsePayload)}
                                    </pre>
                                  </ScrollArea>
                                </div>
                              </TabsContent>


                            </Tabs>


                            {log.errorMessage && (
                              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                <span className="text-sm font-medium text-red-700 dark:text-red-400">Error: </span>
                                <span className="text-sm">{log.errorMessage}</span>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No LLM interactions logged yet. Use the Instrument or Amendment screens to generate logs.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
