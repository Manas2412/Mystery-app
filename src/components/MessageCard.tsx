'use client'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { X } from 'lucide-react'
import { Message } from '@/model/User'
import { toast } from "sonner"
import { ApiResponse } from "@/types/ApiResponse"
import axios from "axios"


type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {

    const handleDeleteConfirm = async () => {
        try {
            // Convert _id to string if it's an ObjectId
            const messageId = typeof message._id === 'string' ? message._id : message._id.toString();

            const response = await axios.delete<ApiResponse>(`/api/delete-message/${messageId}`)
            toast.success(response.data.message)
            onMessageDelete(messageId)
        } catch (error) {
            console.error("Error deleting message", error);
            const axiosError = error as any;
            toast.error("Failed to delete message", {
                description: axiosError.response?.data?.message ?? "An error occurred while deleting the message"
            })
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {message.content as string}
                </CardTitle>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon"><X className="w-4 h-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the message.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    {new Date(message.createdAt).toLocaleString()}
                </div>
            </CardContent>
        </Card>
    )
}

export default MessageCard