import Image from 'next/image'
import React from 'react'
import { Input } from '../../../../../components/ui/input'
import { Button } from '../../../../../components/ui/button'
import { ArrowLeft, Calendar, Clock, Copy, Facebook, Instagram, InstagramIcon, List, Mail, Plus} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'




function InterviewLink({interview_id, formData, }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL +'/'+ interview_id;

    const GetInterviewUrl = () =>{
        return url;
    }
    const onCopyLink =  async () => {
        await navigator.clipboard.writeText(url);
        toast.success('Link Copied')

    }
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <Image src={'/check.png'} alt='check' width={200} height={200} className='w-[100px] h-[100px]'/>
        <h2 className='font-bold text-lg mt-4'>Trợ lý phỏng vấn AI đang sẵn sàng!</h2>
        <p className='mt-3'>Chia sẻ liên kết này với các ứng viên của bạn để bắt đầu quá trình phỏng vấn</p>
        <div className='w-full p-7 mt-6 rounded-lg bg-white'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold'>Link phỏng vấn</h2>
                <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-4xl'>Thời hạn trong 30 ngày</h2>
                
            </div>
            <div className='mt-3 flex gap-3 items-center'>
                <Input defaultValue={GetInterviewUrl()} disabled={true} />
                <Button onClick={() => onCopyLink()}><Copy/> Copy Link</Button>
            </div>
            <hr className='my-5'/>
            <div className='flex gap-5'>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4'/> {formData?.duration}</h2>
                <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='h-4 w-4'/> 10 </h2>
            </div>
        </div>
        <div className='mt-7 bg-white p-5 rounded-lg w-full'>
            <h2 className='font-bold'>Chia sẻ qua</h2>
            <div className='flex gap-7 mt-2'>
            <Button variant={'outline'} className={''}><Mail/>Email</Button>
            <Button variant={'outline'} className={''}><Facebook/>Facebook</Button>
            <Button variant={'outline'} className={''}><Instagram/>Telegram</Button>

            </div>
        </div>
        <div className='flex w-full gap-5 justify-between mt-6'>
            <Link href='/dashboard'>
            <Button variant={'outline'}> <ArrowLeft/>Quay lại Trang Chủ</Button>
            </Link>

            <Link href={`http://localhost:3000/interview/${interview_id}`}>
            <Button > <Plus/> Bắt Đầu Cuộc Phỏng Vấn </Button>
            </Link>
        </div>
    </div>
    
  )
}

export default InterviewLink