export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black min-h-screen w-full">
        <div className="max-w-[1440px] mx-auto h-full">
             {children}
        </div>
    </div>
  )
}
