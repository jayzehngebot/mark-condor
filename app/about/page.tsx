import Image from 'next/image';

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center h-auto p-10">
            <h1 className="text-4xl text-center mt-4 text-slate-400">About M.C.</h1>

            <div className="flex flex-col items-left text-left justify-left h-auto mt-2 sm:w-1/2 sm:mt-0 p-2 sm:p-10">
            
                <div className="text-medium text-slate-500" style={{ textIndent: '2em' }}>
                <p>Raised in Florida, molded by Providence, and now based out of Brooklyn, Mark Condor has always had an eye for detail and a passion for creating spaces that inspire productivity and creativity. His journey into professional organization began with a deep fascination for how environments can shape behavior—think Marie Kondo meets NASA.</p><br/>
                <p>An early interest in structured design and functional aesthetics led Mark to develop his skills in organizing multi-functional office spaces and studios. His path took him from overseeing complex projects to honing his expertise in creating spaces that balance form and function. After years of perfecting his craft in Providence, he moved to Brooklyn, where he built a reputation as a go-to expert for optimizing both personal and professional spaces.</p><br/>
                <p>Mark&apos;s approach is meticulous and thoughtful, drawing on his experiences in various fields, including engineering and project management. His hobbies, such as woodworking and minimalist design, reflect his belief that simplicity and efficiency go hand in hand. He believes that a well-organized space is not just about tidiness but about creating an environment where ideas can flourish and projects can come to life.</p><br/>
                </div>
                <div className="flex w-full items-center justify-center pb-6 pt-6">
                <Image width={500} height={500} src="/about/mc_rides.png" alt="Mark Condor" className="flex w-full h-full rounded-3xl"></Image>
                </div>
                <div className="text-center text-gray-500 text-sm mt-0">Mark Condor riding to the beach on his birthday</div>
            </div>
            
        </div>
    )
}