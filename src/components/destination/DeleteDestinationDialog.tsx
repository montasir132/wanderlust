"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

const DeleteDestinationDialog = ({id}:{id:string}) => {
    const handleDelete = async() => {
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_DESTINATION_DETAILS_API}/${id}`, {
            method: "DELETE",
            headers: { 
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            console.error(`Failed to delete destination: ${res.status}`);
        }
        // const data = await res.json();
        // console.log(data,"Destination deleted successfully");
        redirect("/destinations");

    };
  return (
    <div>
        <AlertDialog>
            <AlertDialogTrigger render={<Button type="button" variant="outline" className="h-9 gap-2 border-[#EE4A4A]/40 bg-white px-4 text-sm text-[#EE4A4A] hover:bg-[#EE4A4A]/5 hover:text-[#EE4A4A]">
            </Button>}>
                <Trash2 className="h-4 w-4" />Cancel
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Delete Travel Package</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete &quot;Bali Paradise&quot;? This action cannot be undone and will permanently remove this travel package from the system.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete Package</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
};

export default DeleteDestinationDialog;
