import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const ArticleList = () => {
  return (
    <div className="pt-10">
      <div className="flex md:flex-row flex-col w-full gap-6">
        <div className="md:w-1/2 w-full">
          <Link href={`/articles/1`}>
            <Card className="bg-background">
              <CardHeader>
                <Image
                  src="https://plus.unsplash.com/premium_photo-1682088845396-1b310a002302?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXJ0aWNsZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="image"
                  width={400}
                  height={200}
                  className="w-full h-[220px] object-cover rounded-lg "
                />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-xs bg-muted-foreground px-4 py-1 rounded-full text-background">
                    Business Growth
                  </p>
                  <span className="text-xs text-muted-foreground">
                    March 27, 2025
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-8">
                  <h3 className="text-lg font-semibold text-gray-500">
                    How to grow your business
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Wether you choose to track your time via paper timesheets,
                    spreadsheets, a swipe-card system
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <Link href={`/articles/1`}>
            <div className="flex flex-col gap-4">
              <Card className="bg-background">
                <CardContent>
                  <div className="flex w-full gap-4">
                    <div className="w-1/4">
                      <Image
                        src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJ0aWNsZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="image"
                        width={400}
                        height={200}
                        className="w-full h-[80px] rounded-2xl"
                      />
                    </div>
                    <div className="w-3/4 flex flex-col gap-2">
                      <div className="flex items-center gap-6">
                        <p className="text-xs bg-muted-foreground px-4 line-clamp-1 py-1 rounded-full text-background">
                          Business Growth
                        </p>
                        <span className="text-xs text-muted-foreground">
                          7 min read
                        </span>
                      </div>
                      <h3 className="text-gray-500 text-xl font-semibold line-clamp-2">
                        NEW! Introducing Macbook setup to boost your
                        productivity
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Link>
          <Link href={`/articles/1`}>
            <div className="flex flex-col gap-4">
              <Card className="bg-background">
                <CardContent>
                  <div className="flex w-full gap-4">
                    <div className="w-1/4">
                      <Image
                        src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJ0aWNsZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="image"
                        width={400}
                        height={200}
                        className="w-full h-[80px] rounded-2xl"
                      />
                    </div>
                    <div className="w-3/4 flex flex-col gap-2">
                      <div className="flex items-center gap-6">
                        <p className="text-xs bg-muted-foreground px-4 line-clamp-1 py-1 rounded-full text-background">
                          Business Growth
                        </p>
                        <span className="text-xs text-muted-foreground">
                          7 min read
                        </span>
                      </div>
                      <h3 className="text-gray-500 text-xl font-semibold line-clamp-2">
                        NEW! Introducing Macbook setup to boost your
                        productivity
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Link>
          <Link href={`/articles/1`}>
            <div className="flex flex-col gap-4">
              <Card className="bg-background">
                <CardContent>
                  <div className="flex w-full gap-4">
                    <div className="w-1/4">
                      <Image
                        src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXJ0aWNsZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="image"
                        width={400}
                        height={200}
                        className="w-full h-[80px] rounded-2xl"
                      />
                    </div>
                    <div className="w-3/4 flex flex-col gap-2">
                      <div className="flex items-center gap-6">
                        <p className="text-xs bg-muted-foreground px-4 line-clamp-1 py-1 rounded-full text-background">
                          Business Growth
                        </p>
                        <span className="text-xs text-muted-foreground">
                          7 min read
                        </span>
                      </div>
                      <h3 className="text-gray-500 text-xl font-semibold line-clamp-2">
                        NEW! Introducing Macbook setup to boost your
                        productivity
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
