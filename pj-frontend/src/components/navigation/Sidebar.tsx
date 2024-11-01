import classes from "./Sidebar.module.css"
import { Center, Button } from '@mantine/core'
import { IconPlus, IconArrowsJoin } from '@tabler/icons-react'

function Sidebar() {
    return (
        <nav className={classes.navbar}>
            {/* <Center> */}
                <Button
                    className={classes.link}
                    variant="subtle"
                    radius={100}
                    onClick={()=>{}}
                >
                    <IconPlus radius={100}/>
                </Button>
                <Button 
                    className={classes.link}
                    variant="subtle"
                    radius={100}
                    onClick={()=>{}}
                >
                    <IconArrowsJoin radius={100} />
                </Button>
            {/* </Center> */}
        </nav>
    )
}

export default Sidebar