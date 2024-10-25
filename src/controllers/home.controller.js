export const homeRouteController = (_req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Hello, Node!',
  });
};
