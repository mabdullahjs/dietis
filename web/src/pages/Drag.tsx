import { useState } from 'react';

const Drag = () => {
    const [widgets, setWidgets] = useState<string[]>([]);

    function handleOnDrag(e: any, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType)
    }
    function handleOnDrop(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        console.log("widgetType", widgetType);
        setWidgets([...widgets, widgetType]);
        if(widgets.includes(widgetType)){
            console.log("already exist");
        }
        else{
            console.log("no");
            
        }
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }
    return (
        <div className='app'>
            <div className="widgets">
                <div
                    className="widget"
                    draggable
                    onDragStart={(e) => handleOnDrag(e, 'WidgetA')}
                >
                    Widget A
                </div>
                <div
                    className="widget"
                    draggable
                    onDragStart={(e) => handleOnDrag(e, 'WidgetB')}
                >
                    Widget B
                </div>
                <div
                    className="widget"
                    draggable
                    onDragStart={(e) => handleOnDrag(e, 'WidgetC')}
                >
                    Widget C
                </div>
            </div>
            <div className="page" style={{border:"2px solid black" , padding:"5rem"}} onDrop={handleOnDrop} onDragOver={handleDragOver}>
                {widgets.map((item: any, index: number) => {
                    return <div key={index}>
                        {item}
                    </div>
                })}
            </div>

        </div>
    )
}

export default Drag