import { Breadcrumb, theme } from "antd";

import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
const aggregateByDate = (data: any) => {
  const aggregated = data.reduce((acc: any, item: any) => {
    const date = item.createdAtVN.split(" ")[0];
    // Lấy ngày từ createdAt
    console.log(date);
    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date] += item.totalPrice;
    console.log(acc);
    return acc;
  }, {});

  return Object.keys(aggregated).map((date) => ({
    date,
    steps: aggregated[date],
  }));
};
const DashboardPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await instance.get("/v1/orders");

      return res.data;
    },
  });
  // const datas = data?.map((item: any, index: number) => item.createdAt);
  // console.log(datas);
  // const aggregatedData = data ? aggregateByDate(data) : [];
  // console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>DashboardPage</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Card className="lg:max-w-md">
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Tuần</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              {/* {(
                aggregatedData &&
                aggregatedData[aggregatedData.length - 1].steps
              ).toLocaleString()}{" "}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                VND
              </span> */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                steps: {
                  label: "Steps",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: -4,
                  right: -4,
                }}
                // data={aggregatedData}
              >
                <Bar
                  dataKey="steps"
                  fill="var(--color-steps)"
                  radius={5}
                  fillOpacity={0.6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    });
                  }}
                />
                <ChartTooltip
                  defaultIndex={2}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                  cursor={false}
                />
                <ReferenceLine
                  y={1200}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                >
                  {/* <Label
                    position="insideBottomLeft"
                    value="Average Steps"
                    offset={10}
                    fill="hsl(var(--foreground))"
                  /> */}
                  {/* <Label
                    position="insideTopLeft"
                    value="12,343"
                    className="text-lg"
                    fill="hsl(var(--foreground))"
                    offset={10}
                    startOffset={100}
                  /> */}
                </ReferenceLine>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
              Over the past 7 days, you have walked{" "}
              <span className="font-medium text-foreground">53,305</span> steps.
            </CardDescription>
            <CardDescription>
              You need{" "}
              <span className="font-medium text-foreground">12,584</span> more
              steps to reach your goal.
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
