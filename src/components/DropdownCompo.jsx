import { signOut } from "@/lib/auth-client";
import {ArrowRightFromSquare, Gear, Persons} from "@gravity-ui/icons";
import {Avatar, Button, Dropdown, Label} from "@heroui/react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const DropdownCompo = ({user}) => {

  const router = useRouter();
  console.log(user);
  return (
    <Dropdown>
      
      <Dropdown.Trigger className="rounded-full flex">
        <h2 className="flex items-center gap-0.5">{user?.name} <ArrowDown /></h2> 
        <Avatar>
          <Avatar.Image
            alt={user?.name}
            src={user?.image}
            referrerPolicy="no-referrer"
          />
          <Avatar.Fallback delayMs={600}>{user?.name.charAt(0)}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            {/* <Avatar size="sm">
              <Avatar.Image
                alt="Jane"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
              />
              <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
            </Avatar> */}
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{user?.name}</p>
              <p className="text-xs leading-none text-muted">{user?.email}</p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <Link href={'/dashboard'}><Label>Dashboard</Label></Link>
          </Dropdown.Item>
          
          
          <Dropdown.Item id="logout" textValue="Logout" variant="danger">
            <div className="flex w-full items-center justify-between gap-2">
              <Button onClick={async()=>{
                              await signOut();
                              router.push('/login')
              
              
                            }} size="sm" variant="danger">LogOut</Button>
              <ArrowRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

export default DropdownCompo