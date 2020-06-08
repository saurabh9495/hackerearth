# 1
# 7
# [0,1,1,0,0,1,1]
# [1,1,1,1,0,0,1]
test_cases = int(input())
for i in range(test_cases):
    len_ = int(input())
    str_ = [int(i) for i in input().split()]
    streak = []
    high = 0
    ctr = 0
    for ct,j in enumerate(str_):
        if j == 0:
            ctr += 1
            high += 1
            if ctr == 2:
                streak.append(high-1)
                ctr = 0
                high = 0
                ctr += 1
                high += 1
        else:
            high += 1
        if ct == len(str_) - 1 and j == 1:
            streak.append(high)
    streak.sort(reverse=True)
    print(streak[0])