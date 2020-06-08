test_cases = int(input())  # number of test cases to be entered
for i in range(test_cases):
    # number of shops, number of people
    shop, people = map(int, input().split())
    cost = [int(i) for i in input().split()]  # cost of items in each ith shop
    profit = []  # total profit from all shops
    shops_visited = []  # shop visited number of times
    shop_value = 0  # shop visited most times
    for s in range(shop):
        shops_visited.append(0)
    for j in range(people):
        left, right = map(int, input().split())
        if left == right:
            shops_visited[left-1] += 1
            profit.append(cost[left-1])
        else:
            summ = 0
            for k in range(left-1, right):
                summ += cost[k]
                shops_visited[k] += 1
            profit.append(summ)
        profit.sort(reverse=True)
    num_of_peple = int(input())
    max_profit = 0
    for l in range(num_of_peple):
        max_profit += profit[l]
    print(max_profit)
    for t in shops_visited:
        if t > shop_value:
            shop_value = t
    for u, val in enumerate(shops_visited):
        if shop_value == val:
            print(u+1)
            break
