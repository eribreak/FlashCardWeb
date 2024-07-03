"use client";
import React, { Children, useEffect, useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { Edit } from "lucide-react";
import adminApi from "@/lib/AdminApi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { set } from "react-hook-form";

export default function DemoPage() {
    const [data, setData] = useState<Payment[]>([]);
    const [reset, setReset] = useState(false);
    const [deleteId, setDeleteId] = useState<number>();
    const [hostId, setHostId] = useState<number>();
    const [name, setName] = useState<string>("");
    const [images, setImages] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    // const handleDelete = async (id: number) => {
    //     const handle = await adminApi.deleteUser(Number(id))
    //     setDeleteId(id);

    // };

    useEffect(() => {
        adminApi.getClassData().then((res) => {
            const dataClass = res.data.data;
            setData(
                dataClass.map((classes) => {
                    return {
                        id: classes.id,
                        name: classes.name,
                        images: classes.images,
                        hostId: classes.hostId,
                        description: classes.description,
                    };
                })
            );
        });
    }, [reset]);

    return (
        <div className="container mx-auto py-10">
            <div className="font-extrabold text-2xl mt-6"> Edit class</div>
            {/* <DataTable columns={columns} data={data} /> */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Images</TableHead>
                        <TableHead>Host Id</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id} </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.images}</TableCell>
                            <TableCell>{item.hostId}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell className="text-right"></TableCell>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => {
                                            setName(item.name);
                                            setImages(item.images);
                                            setHostId(item.hostId);
                                            setDescription(item.description);
                                        }}
                                    >
                                        Edit{" "}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit </DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="name"
                                                className="text-right"
                                            >
                                                Name
                                            </Label>
                                            <Input
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                                id="name"
                                                className="col-span-3"
                                                value={name}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="images"
                                                className="text-right"
                                            >
                                                images
                                            </Label>
                                            <Input
                                                onChange={(e) => {
                                                    setImages(e.target.value);
                                                }}
                                                id="images"
                                                className="col-span-3"
                                                value={images}
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="description"
                                                className="text-right"
                                            >
                                                description
                                            </Label>
                                            <Input
                                                onChange={(e) => {
                                                    setDescription(
                                                        e.target.value
                                                    );
                                                }}
                                                id="description"
                                                className="col-span-3"
                                                value={description}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            type="submit"
                                            onClick={() => {
                                                adminApi
                                                    .editClass({
                                                        id: Number(item.id),
                                                        name: name,
                                                        images: images,
                                                        hostId: Number(hostId),
                                                        description:
                                                            description,
                                                    })
                                                    .then(() => {
                                                        setReset(!reset);
                                                    });
                                            }}
                                        >
                                            Save changes
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
