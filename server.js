const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
const DATA = path.join(__dirname, "data");
if (!fs.existsSync(DATA)) fs.mkdirSync(DATA);
const productsFile = path.join(DATA, "products.json");
const ordersFile = path.join(DATA, "orders.json");
const bookingsFile = path.join(DATA, "service-bookings.json");

const seedProducts = [
 {id:1,name:"Dell Latitude 5420",category:"Laptops",price:350000,oldPrice:450000,stock:5,featured:true,tag:"Deal",specs:"Core i5 • 11th Gen • 16GB RAM • 256GB SSD",image:"https://images.unsplash.com/photo-158887ỉnh?auto=format&fit=crop&w=900&q=80",description:"Reliable business laptop for productivity, study and everyday work."},
 {id:2,name:"HP EliteBook x360 1040 G8",category:"Laptops",price:650000,oldPrice:850000,stock:3,featured:true,tag:"Premium",specs:"Core i7 • 11th Gen • 16GB RAM • 512GB SSD • Touch",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",description:"Premium convertible laptop with touchscreen and powerful performance."},
 {id:3,name:"Wireless Keyboard & Mouse",category:"Accessories",price:25000,stock:12,featured:false,tag:"Accessory",specs:"2.4GHz wireless • USB receiver",image:"https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=900&q=80",description:"A clean desk setup with a responsive keyboard and mouse combo."},
 {id:4,name:"USB-C Hub 7-in-1",category:"Accessories",price:42000,stock:8,featured:false,tag:"Useful",specs:"HDMI • USB 3.0 • SD/TF • USB-C PD",image:"https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",description:"Expand your laptop connectivity with one compact hub."},
 {id:5,name:"Laptop SSD Upgrade",category:"Storage",price:55000,stock:20,featured:true,tag:"Upgrade",specs:"512GB NVMe SSD • installation available",image:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80",description:"Speed up boot times and application loading with an SSD upgrade."},
 {id:6,name:"Laptop Cooling Stand",category:"Accessories",price:18000,stock:10,featured:false,tag:"Cooling",specs:"Adjustable • ergonomic • USB powered",image:"https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=900&q=80",description:"Improve airflow and comfort during long working sessions."}
];
if (!fs.existsSync(productsFile) || !JSON.parse(fs.readFileSync(productsFile,"utf8")).length) fs.writeFileSync(productsFile, JSON.stringify(seedProducts,null,2));
for (const f of [ordersFile,bookingsFile]) if(!fs.existsSync(f)) fs.writeFileSync(f,"[]");
const read = f => JSON.parse(fs.readFileSync(f,"utf8"));
const write = (f,d) => fs.writeFileSync(f,JSON.stringify(d,null,2));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.get("/api/products",(req,res)=>{
 let items=read(productsFile), q=(req.query.q||"").toLowerCase(), category=req.query.category;
 if(q) items=items.filter(p=>(p.name+" "+p.description+" "+p.category).toLowerCase().includes(q));
 if(category && category!=="All") items=items.filter(p=>p.category===category);
 res.json(items);
});
app.get("/api/products/:id",(req,res)=>{
 const p=read(productsFile).find(x=>x.id===Number(req.params.id));
 p?res.json(p):res.status(404).json({error:"Product not found"});
});
app.post("/api/orders",(req,res)=>{
 const {customer,items,total}=req.body;
 if(!customer?.name||!customer?.phone||!Array.isArray(items)||!items.length) return res.status(400).json({error:"Please provide name, phone and cart items."});
 const order={id:"BLK-"+Date.now().toString().slice(-8),createdAt:new Date().toISOString(),customer,items,total,status:"Pending"};
 const orders=read(ordersFile); orders.unshift(order); write(ordersFile,orders);
 res.status(201).json({message:"Order received",orderId:order.id});
});
app.post("/api/service-bookings",(req,res)=>{
 const {name,phone,service,device,details}=req.body;
 if(!name||!phone||!service) return res.status(400).json({error:"Name, phone and service are required."});
 const booking={id:"SRV-"+Date.now().toString().slice(-8),createdAt:new Date().toISOString(),name,phone,service,device,details,status:"Received"};
 const bookings=read(bookingsFile); bookings.unshift(booking); write(bookingsFile,bookings);
 res.status(201).json({message:"Service request received",bookingId:booking.id});
});
app.get("/api/health",(req,res)=>res.json({status:"ok",service:"Bluearnk API"}));
app.listen(PORT,()=>console.log(`Bluearnk website running at http://localhost:${PORT}`));