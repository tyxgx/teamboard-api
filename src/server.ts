import app from './index';
import testRoutes from './routes/test'; // ✅ Import karo

const PORT = process.env.PORT || 5001;

// ✅ Use the route
app.use(testRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});